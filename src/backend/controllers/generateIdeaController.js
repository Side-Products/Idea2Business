import mongoose from "mongoose";
import User from "../models/user";
import IdeaSwipe from "../models/ideaSwipe";
import IdeaSwipeVotes from "../models/ideaSwipeVotes";
import ErrorHandler from "@/backend/utils/errorHandler";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";
import { Configuration, OpenAIApi } from "openai";
import { getTimeDifference } from "@/utils/Helpers";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// add to db => /api/generate-idea
const generateIdea = catchAsyncErrors(async (req, res, next) => {
	const randomNumber = Math.floor(Math.random() * 10) + 1; // generates a random number between 1 to 10

	if (randomNumber > 5) {
		const prompt =
			"Generate a business/startup idea and give a name and short description of max 50 words for it. Also give an appropriate emoji in unicode for it. Return the result in JSON format only with the keys 'name', 'description', and 'emoji'.\n";

		let _temp = 0.8;

		// generate response from OpenAI
		const baseCompletion = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `${prompt}`,
			temperature: _temp,
			max_tokens: 1000,
		});
		const basePromptOutput = baseCompletion.data.choices.pop();
		const output = JSON.stringify(basePromptOutput.text.trim());

		try {
			let result = output;
			typeof output == "string" && (result = JSON.parse(output));

			console.log("New idea generated: ", result);

			typeof result === "string" && (result = eval("(" + result + ")"));
			const name = result.name;
			const description = result.description;
			const rawEmoji = result.emoji;
			let emoji = rawEmoji;

			if (emoji.startsWith("U000")) {
				emoji = String.fromCodePoint(parseInt(emoji.slice(4), 16));
			}

			try {
				// save to db
				const ideaSwipe = await IdeaSwipe.create({ name, description, emoji });
				const timeDifference = getTimeDifference(new Date(ideaSwipe.createdAt), new Date());

				res.status(200).json({
					success: true,
					ideaSwipe: { ...ideaSwipe._doc, timeDifference },
				});
			} catch (error) {
				console.log("error214:", error);
			}
		} catch (error) {
			console.log("error:", error);
		}
	} else {
		const userId = req.user._id || req.user.id;

		const ideaSwipes = await IdeaSwipe.aggregate([
			// lookup the IdeaSwipeVotes for the given user
			{
				$lookup: {
					from: "ideaswipevotes",
					let: { ideaSwipeId: "$_id" },
					pipeline: [
						{
							$match: {
								$expr: {
									$and: [{ $eq: ["$user", mongoose.Types.ObjectId(userId)] }, { $eq: ["$ideaSwipe", "$$ideaSwipeId"] }],
								},
							},
						},
					],
					as: "ideaswipevotes",
				},
			},
			// filter out IdeaSwipes that the user has voted on
			{
				$match: {
					ideaswipevotes: { $size: 0 },
				},
			},
			{ $sample: { size: 1 } },
		]);

		// Still have IdeaSwipes that the user has not voted on
		if (ideaSwipes && ideaSwipes.length > 0) {
			const randomDoc = ideaSwipes[0];
			const timeDifference = getTimeDifference(new Date(randomDoc.createdAt), new Date());

			res.status(200).json({
				success: true,
				ideaSwipe: { ...randomDoc, timeDifference, vote: 0 },
			});
		}
		// All IdeaSwipes have been voted on by the user
		else {
			// const count = await IdeaSwipe.countDocuments();
			// const rand = Math.floor(Math.random() * count);
			let randomDoc = await IdeaSwipe.aggregate([
				{ $sample: { size: 1 } },
				{
					$lookup: {
						from: "ideaswipevotes",
						let: { ideaSwipeId: "$_id" },
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [{ $eq: ["$user", mongoose.Types.ObjectId(userId)] }, { $eq: ["$ideaSwipe", "$$ideaSwipeId"] }],
									},
								},
							},
						],
						as: "ideaswipevotes",
					},
				},
				{
					$unwind: "$ideaswipevotes",
				},
				{
					$replaceRoot: {
						newRoot: {
							$mergeObjects: ["$ideaswipevotes", "$$ROOT"],
						},
					},
				},
				{
					$project: {
						ideaswipevotes: 0,
					},
				},
			]);
			randomDoc = randomDoc[0];
			const timeDifference = getTimeDifference(new Date(randomDoc.createdAt), new Date());

			res.status(200).json({
				success: true,
				ideaSwipe: { ...randomDoc, timeDifference },
			});
		}
	}
});

const getIdea = catchAsyncErrors(async (req, res, next) => {
	const count = await IdeaSwipe.countDocuments();
	const rand = Math.floor(Math.random() * count);
	const randomDoc = await IdeaSwipe.findOne().skip(rand);
	const timeDifference = getTimeDifference(new Date(randomDoc.createdAt), new Date());

	res.status(200).json({
		success: true,
		ideaSwipe: { ...randomDoc._doc, timeDifference },
	});
});

const allIdeaSwipes = catchAsyncErrors(async (req, res) => {
	const userId = (req && req.user && req.user._id) || (req && req.user && req.user.id);
	const limit = 8;

	let pipeline = [];
	if (userId) {
		pipeline.push(
			{
				$lookup: {
					from: "ideaswipevotes",
					let: { ideaSwipeId: "$_id" },
					pipeline: [
						{
							$match: {
								$expr: {
									$and: [{ $eq: ["$user", mongoose.Types.ObjectId(userId)] }, { $eq: ["$ideaSwipe", "$$ideaSwipeId"] }],
								},
							},
						},
					],
					as: "ideaswipevotes",
				},
			},
			{
				$addFields: {
					vote: { $first: "$ideaswipevotes.vote" },
				},
			},
			{
				$project: {
					ideaswipevotes: 0,
				},
			}
		);
	}

	pipeline.push(
		{
			$addFields: {
				timeDifference: { $subtract: [new Date(), { $toDate: "$createdAt" }] },
			},
		},
		{ $limit: limit },
		{ $sort: { votes: -1 } }
	);

	const monthlyTop = await IdeaSwipe.aggregate([
		// only get results from the last month
		{
			$match: {
				createdAt: {
					$gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
				},
			},
		},
		...pipeline,
	]);

	const weeklyTop = await IdeaSwipe.aggregate([
		// only get results from the last week
		{
			$match: {
				createdAt: {
					$gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
				},
			},
		},
		...pipeline,
	]);

	const yesterdayTop = await IdeaSwipe.aggregate([
		{
			$match: {
				createdAt: {
					$gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
					$lte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
				},
			},
		},
		...pipeline,
	]);

	const todayTop = await IdeaSwipe.aggregate([
		{
			$match: {
				createdAt: {
					$gte: new Date(Date.now() - 1000 * 60 * 60 * 24),
				},
			},
		},
		...pipeline,
	]);

	const newTop = await IdeaSwipe.aggregate([
		{
			$sort: {
				createdAt: -1,
			},
		},
		...pipeline,
	]);

	const allTimeTop = await IdeaSwipe.aggregate([...pipeline]);

	res.status(200).json({
		success: true,
		ideaSwipes: {
			monthlyTop,
			weeklyTop,
			yesterdayTop,
			todayTop,
			newTop,
			allTimeTop,
		},
	});
});

const voteIdea = catchAsyncErrors(async (req, res) => {
	// check user
	const userId = req.user._id || req.user.id;
	const user = await User.findOne({ _id: userId });

	if (user) {
	} else {
		return next(new ErrorHandler("User not found", 404));
	}

	const { id, type } = req.body;
	const newVote = type == "upvote" ? 1 : -1;

	// check if the user already voted
	const ideaSwipeVote = await IdeaSwipeVotes.findOne({ user: userId, ideaSwipe: id });

	if (ideaSwipeVote) {
		const oldVote = ideaSwipeVote.vote;

		if (oldVote == newVote) {
			res.status(200).json({
				success: true,
				ideaSwipeVote: ideaSwipeVote,
			});
			return;
		}

		ideaSwipeVote.vote = newVote;
		const vote = await ideaSwipeVote.save();

		const ideaSwipe = await IdeaSwipe.findById(id);
		ideaSwipe.votes = ideaSwipe.votes + newVote + newVote;
		const result = await ideaSwipe.save();

		res.status(200).json({
			success: true,
			ideaSwipeVote: { ...vote._doc, ideaSwipe: result },
		});
		return;
	}

	// save to db
	const vote = await IdeaSwipeVotes.create({ user: userId, ideaSwipe: id, vote: newVote });

	const ideaSwipe = await IdeaSwipe.findById(id);
	ideaSwipe.votes = ideaSwipe.votes + newVote;
	const result = await ideaSwipe.save();

	res.status(200).json({
		success: true,
		ideaSwipeVote: { ...vote._doc, ideaSwipe: result },
	});
});

export { generateIdea, allIdeaSwipes, voteIdea, getIdea };
