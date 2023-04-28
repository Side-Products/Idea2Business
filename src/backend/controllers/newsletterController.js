import Newsletter from "../models/newsletter";
import ErrorHandler from "@/backend/utils/errorHandler";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";

// get all newsletter entries => /api/admin/newsletter
const allNewsletters = catchAsyncErrors(async (req, res) => {
	const newsletters = await Newsletter.find().sort({ createdAt: "desc" });

	res.status(200).json({
		success: true,
		newsletters,
	});
});

// add to db => /api/newsletter
const newNewsletter = catchAsyncErrors(async (req, res) => {
	// save to db
	const { email, frequency } = req.body;
	const newsletter = await Newsletter.create({ email, frequency });

	res.status(200).json({
		success: true,
		newsletter,
	});
});

// delete newsletter entry => /api/admin/newsletter/:id
const deleteNewsletter = catchAsyncErrors(async (req, res, next) => {
	const newsletter = await Newsletter.findById(req.query.id);
	if (!newsletter) {
		return next(new ErrorHandler("No newsletter entry with this ID", 404));
	}

	await newsletter.remove();
	res.status(200).json({ success: true, message: "Deleted successfully" });
});

export { allNewsletters, newNewsletter, deleteNewsletter };
