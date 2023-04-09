import IdeaSearch from "../models/ideaSearch";
import User from "../models/user";
import GenerateResponse from "../models/generateResponse";
import Subscription from "../models/subscription";
import ErrorHandler from "@/backend/utils/errorHandler";
import APIFeatures from "@/backend/utils/apiFeatures";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";
import { freePlan } from "@/config/constants";
import { getCurrentSubscriptionTier } from "@/utils/Helpers";

const allSearches = catchAsyncErrors(async (req, res) => {
	const resultsPerPage = 4;
	const ideasCount = await IdeaSearch.countDocuments();

	const apiFeatures = new APIFeatures(
		IdeaSearch.find()
			.populate({
				path: "user",
				select: "name email",
			})
			.sort({ createdAt: "desc" }),
		req.query
	)
		.search()
		.filter();
	let ideas = await apiFeatures.query;
	let filteredIdeasCount = ideas.length;

	apiFeatures.pagination(resultsPerPage);
	ideas = await apiFeatures.query.clone();

	res.status(200).json({
		success: true,
		ideasCount,
		resultsPerPage,
		filteredIdeasCount,
		ideas,
	});
});

const mySearches = catchAsyncErrors(async (req, res) => {
	const resultsPerPage = 4;
	const ideasCount = await IdeaSearch.countDocuments({ user: req.user._id || req.user.id });

	const apiFeatures = new APIFeatures(IdeaSearch.find({ user: req.user._id || req.user.id }).sort({ createdAt: "desc" }), req.query).search().filter();
	let ideas = await apiFeatures.query;
	let filteredIdeasCount = ideas.length;

	apiFeatures.pagination(resultsPerPage);
	ideas = await apiFeatures.query.clone();

	res.status(200).json({
		success: true,
		ideasCount,
		resultsPerPage,
		filteredIdeasCount,
		ideas,
	});
});

// add to db => /api/ideas
const newIdeaSearch = catchAsyncErrors(async (req, res, next) => {
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
		return next(new ErrorHandler("User not found with this email", 404));
	}

	// save idea search to db
	const { name, description } = req.body;
	const idea = await IdeaSearch.create({ user: req.user._id || req.user.id, name: name, description: description });
	const searchCount = await IdeaSearch.countDocuments({ user: req.user._id || req.user.id });

	res.status(200).json({ success: true, idea, searchCount });
});

// get idea details => /api/ideas/:id
const getSearchedIdea = catchAsyncErrors(async (req, res, next) => {
	const ideaSearch = await IdeaSearch.findById(req.query.id);
	if (!ideaSearch) {
		return next(new ErrorHandler("No idea found with this ID", 404));
	}
	res.status(200).json({ success: true, ideaSearch });
});

// update idea details => /api/ideas/:id
const updateSearchedIdea = catchAsyncErrors(async (req, res, next) => {
	let ideaSearch = await IdeaSearch.findById(req.query.id);
	if (!ideaSearch) {
		return next(new ErrorHandler("No idea found with this ID", 404));
	}

	ideaSearch = await IdeaSearch.findByIdAndUpdate(req.query.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({ success: true, ideaSearch });
});

// delete idea => /api/ideas/:id
const deleteSearchedIdea = catchAsyncErrors(async (req, res, next) => {
	const ideaSearch = await IdeaSearch.findById(req.query.id);
	if (!ideaSearch) {
		return next(new ErrorHandler("No idea found with this ID", 404));
	}

	// Delete all generated responses related to the searched idea
	await GenerateResponse.deleteMany({ ideaSearch: ideaSearch._id });

	await ideaSearch.remove();
	res.status(200).json({ success: true, message: "Deleted successfully" });
});

export { allSearches, mySearches, newIdeaSearch, getSearchedIdea, updateSearchedIdea, deleteSearchedIdea };
