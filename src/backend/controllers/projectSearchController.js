import ProjectSearch from "../models/projectSearch";
import User from "../models/user";
import Subscription from "../models/subscription";
import ErrorHandler from "@/backend/utils/errorHandler";
import APIFeatures from "@/backend/utils/apiFeatures";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";

const allSearches = catchAsyncErrors(async (req, res) => {
	const resultsPerPage = 4;
	const projectsCount = await ProjectSearch.countDocuments();

	const apiFeatures = new APIFeatures(
		ProjectSearch.find()
			.populate({
				path: "user",
				select: "name email",
			})
			.sort({ createdAt: "desc" }),
		req.query
	)
		.search()
		.filter();
	let projects = await apiFeatures.query;
	let filteredProjectsCount = projects.length;

	apiFeatures.pagination(resultsPerPage);
	projects = await apiFeatures.query.clone();

	res.status(200).json({
		success: true,
		projectsCount,
		resultsPerPage,
		filteredProjectsCount,
		projects,
	});
});

const mySearches = catchAsyncErrors(async (req, res) => {
	const resultsPerPage = 4;
	const projectsCount = await ProjectSearch.countDocuments({ user: req.user._id || req.user.id });

	const apiFeatures = new APIFeatures(ProjectSearch.find({ user: req.user._id || req.user.id }).sort({ createdAt: "desc" }), req.query).search().filter();
	let projects = await apiFeatures.query;
	let filteredProjectsCount = projects.length;

	apiFeatures.pagination(resultsPerPage);
	projects = await apiFeatures.query.clone();

	res.status(200).json({
		success: true,
		projectsCount,
		resultsPerPage,
		filteredProjectsCount,
		projects,
	});
});

// add to db => /api/projects
const newProjectSearch = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.user.email });
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
				const subscriptionPlan =
					subscription && subscription.amountPaid == 10 && new Date(subscription.subscriptionValidUntil) > Date.now()
						? "Pro Plus"
						: subscription && subscription.amountPaid == 5 && new Date(subscription.subscriptionValidUntil) > Date.now()
						? "Standard"
						: "Free";

				if (subscriptionPlan !== "Free") {
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

	// save project search to db
	const { name, description } = req.body;
	const project = await ProjectSearch.create({ user: req.user._id || req.user.id, name: name, description: description });
	const searchCount = await ProjectSearch.countDocuments({ user: req.user._id || req.user.id });

	res.status(200).json({ success: true, project, searchCount });
});

// get project details => /api/projects/:id
const getSearchedProject = catchAsyncErrors(async (req, res, next) => {
	const projectSearch = await ProjectSearch.findById(req.query.id);
	if (!projectSearch) {
		return next(new ErrorHandler("No project found with this ID", 404));
	}
	res.status(200).json({ success: true, projectSearch });
});

// update project details => /api/projects/:id
const updateSearchedProject = catchAsyncErrors(async (req, res, next) => {
	let projectSearch = await ProjectSearch.findById(req.query.id);
	if (!projectSearch) {
		return next(new ErrorHandler("No project found with this ID", 404));
	}

	projectSearch = await ProjectSearch.findByIdAndUpdate(req.query.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({ success: true, projectSearch });
});

// delete project => /api/projects/:id
const deleteSearchedProject = catchAsyncErrors(async (req, res, next) => {
	const projectSearch = await ProjectSearch.findById(req.query.id);
	if (!projectSearch) {
		return next(new ErrorHandler("No project found with this ID", 404));
	}

	await projectSearch.remove();
	res.status(200).json({ success: true, message: "Deleted successfully" });
});

export { allSearches, mySearches, newProjectSearch, getSearchedProject, updateSearchedProject, deleteSearchedProject };
