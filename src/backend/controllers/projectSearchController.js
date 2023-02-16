import ProjectSearch from "../models/projectSearch";
import ErrorHandler from "@/backend/utils/errorHandler";
import APIFeatures from "@/backend/utils/apiFeatures";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";

const allSearches = catchAsyncErrors(async (req, res) => {
	const resultsPerPage = 4;
	const projectsCount = await ProjectSearch.countDocuments();

	const apiFeatures = new APIFeatures(ProjectSearch.find(), req.query).search().filter();
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
const newProjectSearch = catchAsyncErrors(async (req, res) => {
	const projectSearch = await ProjectSearch.create(req.body);
	res.status(200).json({ success: true, projectSearch });
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

export { allSearches, newProjectSearch, getSearchedProject, updateSearchedProject, deleteSearchedProject };
