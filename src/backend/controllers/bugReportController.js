import BugReport from "../models/bugReport";
import ErrorHandler from "@/backend/utils/errorHandler";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";

// get all bug reports => /api/admin/bug-reports
const allBugReports = catchAsyncErrors(async (req, res) => {
	const bugReports = await BugReport.find().sort({ createdAt: "desc" });

	res.status(200).json({
		success: true,
		bugReports,
	});
});

// add to db => /api/report-a-bug
const newBugReport = catchAsyncErrors(async (req, res) => {
	// save to db
	const { name, email, bugDescription } = req.body;
	const bugReport = await BugReport.create({ name, email, bugDescription });

	res.status(200).json({
		success: true,
		bugReport,
	});
});

// delete bug report => /api/admin/bug-reports/:id
const deleteBugReport = catchAsyncErrors(async (req, res, next) => {
	const bugReport = await BugReport.findById(req.query.id);
	if (!bugReport) {
		return next(new ErrorHandler("No bug report with this ID", 404));
	}

	await bugReport.remove();
	res.status(200).json({ success: true, message: "Deleted successfully" });
});

export { allBugReports, newBugReport, deleteBugReport };
