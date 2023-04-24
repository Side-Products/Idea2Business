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

	const result = JSON.parse(output);
	const { name, description } = result;

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

	// save to db
	const vote = await IdeaSwipeVotes.create({ user: req.user._id || req.user.id, ideaSwipe: id, vote: type == "upvote" ? 1 : -1 });

	res.status(200).json({
		success: true,
		vote: vote,
	});
});

export { generateIdea, allIdeaSwipes, voteIdea };
