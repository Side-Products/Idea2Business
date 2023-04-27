import GenerateResponse from "../models/generateResponse";
import User from "../models/user";
import IdeaSearch from "../models/ideaSearch";
import Subscription from "../models/subscription";
import APIFeatures from "@/backend/utils/apiFeatures";
import ErrorHandler from "@/backend/utils/errorHandler";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";
import { Configuration, OpenAIApi } from "openai";
import { generateCategories, freePlan, standardPlan, proPlusPlan } from "@/config/constants";
import { getCurrentSubscriptionTier } from "@/utils/Helpers";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// add to db => /api/generate
const generateNewResponse = catchAsyncErrors(async (req, res, next) => {
	// check user
	const userId = req.user._id || req.user.id;
	const user = await User.findOne({ _id: userId });
	const { identifier, ideaName, ideaDescription, category, index } = req.body;

	if (user) {
		if (user.credits > 0) {
			if (generateCategories[category][index].subscriptionPlanRequired !== freePlan) {
				// check if user has a subscription
				const _subscription = await Subscription.find({ user: userId }).sort({ paidOn: "desc" }).populate({
					path: "user",
					select: "name email",
				});
				let subscription;
				if (_subscription && _subscription[0]) subscription = _subscription[0];

				if (subscription || user.role == "admin" || user.role == "allAccess") {
					// Check for which plan the user is subscribed to
					const subscriptionPlan = getCurrentSubscriptionTier(subscription);

					if (
						subscriptionPlan == proPlusPlan ||
						(subscriptionPlan == standardPlan && generateCategories[category][index].subscriptionPlanRequired == standardPlan) ||
						user.role == "admin" ||
						user.role == "allAccess"
					) {
						// Do nothing
					} else {
						return next(
							new ErrorHandler(
								"You are not on the correct subscription tier to access this. Please checkout our pricing and upgrade your plan",
								400
							)
						);
					}
				} else {
					return next(
						new ErrorHandler("You are not on the correct subscription tier to access this. Please checkout our pricing and upgrade your plan", 400)
					);
				}
			}
			// Deduct 1 credit from user
			user.credits -= 1;
			await user.save();

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
			await GenerateResponse.create({ category, identifier, ideaSearch: ideaSearch._id, response: output, user: userId });

			res.status(200).json({
				success: true,
				output: output,
			});
		} else {
			return next(new ErrorHandler("You do not have enough credits to generate results. Please checkout our pricing and get a paid plan", 400));
		}
	} else {
		return next(new ErrorHandler("User not found", 404));
	}
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
