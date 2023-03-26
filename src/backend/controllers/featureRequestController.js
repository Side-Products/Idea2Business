import FeatureRequest from "../models/featureRequest";
import ErrorHandler from "@/backend/utils/errorHandler";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";

// get all feature requests => /api/admin/feature-request
const allFeatureRequests = catchAsyncErrors(async (req, res) => {
	const featureRequests = await FeatureRequest.find().sort({ createdAt: "desc" });

	res.status(200).json({
		success: true,
		featureRequests,
	});
});

// add to db => /api/feature-request
const newFeatureRequest = catchAsyncErrors(async (req, res) => {
	// save to db
	const { name, email, featureName, featureDescription } = req.body;
	const featureRequest = await FeatureRequest.create({ name, email, featureName, featureDescription });

	res.status(200).json({
		success: true,
		featureRequest,
	});
});

// delete contact us message => /api/admin/feature-request/:id
const deleteFeatureRequest = catchAsyncErrors(async (req, res, next) => {
	const featureRequest = await FeatureRequest.findById(req.query.id);
	if (!featureRequest) {
		return next(new ErrorHandler("No feature request with this ID", 404));
	}

	await featureRequest.remove();
	res.status(200).json({ success: true, message: "Deleted successfully" });
});

export { allFeatureRequests, newFeatureRequest, deleteFeatureRequest };
