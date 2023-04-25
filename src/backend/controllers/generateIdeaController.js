import User from "../models/user";
import IdeaSwipe from "../models/ideaSwipe";
import IdeaSwipeVotes from "../models/ideaSwipeVotes";
import ErrorHandler from "@/backend/utils/errorHandler";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// add to db => /api/generate-idea
const generateIdea = catchAsyncErrors(async (req, res, next) => {
	const prompt =
		"Generate a business/startup idea and give a name and short description of max 50 words for it. Return the result in JSON format only with the keys 'name' and 'description'.\n";

	let _temp = 0.8;

	// generate response from OpenAI
	const baseCompletion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `${prompt}`,
		temperature: _temp,
		max_tokens: 1000,
	});
	const basePromptOutput = baseCompletion.data.choices.pop();

	const output = basePromptOutput.text.trim();

	const result = JSON.parse(JSON.parse(JSON.stringify(output)));
	const name = result["name"];
	const description = result["description"];

	console.log("result:", result);

	// save to db
	const ideaSwipe = await IdeaSwipe.create({ name, description });

	res.status(200).json({
		success: true,
		ideaSwipe: ideaSwipe,
	});
});

const allIdeaSwipes = catchAsyncErrors(async (req, res) => {
	const ideaSwipes = await IdeaSwipe.find().sort({ createdAt: "desc" });

	res.status(200).json({
		success: true,
		ideaSwipes,
	});
});

const voteIdea = catchAsyncErrors(async (req, res) => {
	// check user
	const user = await User.findOne({ _id: req.user._id });

	if (user) {
	} else {
		return next(new ErrorHandler("User not found", 404));
	}

	const { id, type } = req.body;
	const newVote = type == "upvote" ? 1 : -1;

	// check if the user already voted
	const ideaSwipeVote = await IdeaSwipeVotes.findOne({ user: req.user._id || req.user.id, ideaSwipe: id });
	if (ideaSwipeVote) {
		const oldVote = ideaSwipeVote.vote;

		if (oldVote == newVote) {
			res.status(200).json({
				success: true,
				vote: ideaSwipeVote,
			});
			return;
		}

		ideaSwipeVote.vote = newVote;
		const vote = await ideaSwipeVote.save();

		const ideaSwipe = await IdeaSwipe.findById(id);
		ideaSwipe.votes = ideaSwipe.votes + newVote + newVote;
		await ideaSwipe.save();

		res.status(200).json({
			success: true,
			vote: vote,
		});
		return;
	}

	// save to db
	const vote = await IdeaSwipeVotes.create({ user: req.user._id || req.user.id, ideaSwipe: id, vote: newVote });

	const ideaSwipe = await IdeaSwipe.findById(id);
	ideaSwipe.votes = ideaSwipe.votes + newVote;
	await ideaSwipe.save();

	res.status(200).json({
		success: true,
		vote: vote,
	});
});

export { generateIdea, allIdeaSwipes, voteIdea };
