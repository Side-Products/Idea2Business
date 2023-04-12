import IdeaSearch from "../models/ideaSearch";
import User from "../models/user";
import GenerateResponse from "../models/generateResponse";
import ErrorHandler from "@/backend/utils/errorHandler";
import APIFeatures from "@/backend/utils/apiFeatures";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";

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
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
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
