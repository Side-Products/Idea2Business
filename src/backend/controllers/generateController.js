import GenerateResponse from "../models/generateResponse";
import User from "../models/user";
import IdeaSearch from "../models/ideaSearch";
import Subscription from "../models/subscription";
import APIFeatures from "@/backend/utils/apiFeatures";
import ErrorHandler from "@/backend/utils/errorHandler";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";
import { Configuration, OpenAIApi } from "openai";
import { generateCategories, freePlan } from "@/config/constants";
import { getCurrentSubscriptionTier } from "@/utils/Helpers";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// add to db => /api/generate
const generateNewResponse = catchAsyncErrors(async (req, res, next) => {
	// check user
	const user = await User.findOne({ _id: req.user._id });

	if (user) {
		if (user.credits > 0) {
			user.credits -= 1;
			await user.save();
		} else {
			const _subscription = await Subscription.find({ user: req.user._id || req.user.id })
				.sort({ paidOn: "desc" })
				.populate({
					path: "user",
					select: "name email",
				});
			let subscription;
			if (_subscription && _subscription[0]) subscription = _subscription[0];

			if (subscription) {
				// Check for which plan the user is subscribed to
				const subscriptionPlan = getCurrentSubscriptionTier(subscription);

				if (subscriptionPlan !== freePlan) {
					// Do nothing
				} else {
					return next(new ErrorHandler("You do not have a subscription or enough credits to generate results", 400));
				}
			} else {
				return next(new ErrorHandler("You do not have a subscription or enough credits to generate results", 400));
			}
		}
	} else {
		return next(new ErrorHandler("User not found", 404));
	}

	const { identifier, ideaName, ideaDescription, category, index } = req.body;
	const userInput = `${ideaName}: ${ideaDescription}`;

	const promptPrefix = generateCategories[category][index].prompt;

	let _temp = 0.9;
	if (category === "decks") {
		_temp = 0.7;
	}

	// generate response from OpenAI
	const baseCompletion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `${promptPrefix}\n${userInput}\n`,
		temperature: _temp,
		max_tokens: 3000,
	});
	const basePromptOutput = baseCompletion.data.choices.pop();
	const output = basePromptOutput.text.trim();

	// get latest matching ideaSearch that is related and store it's id
	const ideaSearch = await IdeaSearch.findOne({ name: ideaName.trim(), description: ideaDescription.trim() }).sort({ createdAt: "desc" });

	// save to db
	await GenerateResponse.create({ category, identifier, ideaSearch: ideaSearch._id, response: output, user: req.user._id || req.user.id });

	res.status(200).json({
		success: true,
		output: output,
	});
});

// get all generated responses => /api/admin/generated-response
const allGeneratedResponses = catchAsyncErrors(async (req, res) => {
	const resultsPerPage = 4;
	const generatedResponsesCount = await GenerateResponse.countDocuments();

	const apiFeatures = new APIFeatures(
		GenerateResponse.find()
			.populate({
				path: "user",
				select: "name email",
			})
			.populate({
				path: "ideaSearch",
				select: "name description",
			})
			.sort({ createdAt: "desc" }),
		req.query
	)
		.search()
		.filter();
	let generatedResponses = await apiFeatures.query;
	let filteredGeneratedResponsesCount = generatedResponses.length;

	apiFeatures.pagination(resultsPerPage);
	generatedResponses = await apiFeatures.query.clone();

	res.status(200).json({
		success: true,
		generatedResponsesCount,
		resultsPerPage,
		filteredGeneratedResponsesCount,
		generatedResponses,
	});
});

// delete generated response => /api/admin/generated-response/:id
const deleteGeneratedResponse = catchAsyncErrors(async (req, res, next) => {
	const generatedResponse = await GenerateResponse.findById(req.query.id);
	if (!generatedResponse) {
		return next(new ErrorHandler("No generated response found with this ID", 404));
	}

	await generatedResponse.remove();
	res.status(200).json({ success: true, message: "Deleted successfully" });
});

export { generateNewResponse, allGeneratedResponses, deleteGeneratedResponse };
