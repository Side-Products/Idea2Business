import ContactUs from "../models/contactUs";
import ErrorHandler from "@/backend/utils/errorHandler";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";

// get all contact us messages => /api/admin/contact-us
const allContactUsMessages = catchAsyncErrors(async (req, res) => {
	const contactUsMessages = await ContactUs.find().sort({ createdAt: "desc" });

	res.status(200).json({
		success: true,
		contactUsMessages,
	});
});

// add to db => /api/contact-us
const newContactUsMessage = catchAsyncErrors(async (req, res) => {
	// save to db
	const { name, email, subject, message } = req.body;
	const contactUsMessage = await ContactUs.create({ name, email, subject, message });

	res.status(200).json({
		success: true,
		contactUsMessage,
	});
});

// delete contact us message => /api/admin/contact-us/:id
const deleteContactUsMessage = catchAsyncErrors(async (req, res, next) => {
	const contactUsMessage = await ContactUs.findById(req.query.id);
	if (!contactUsMessage) {
		return next(new ErrorHandler("No contact request with this ID", 404));
	}

	await contactUsMessage.remove();
	res.status(200).json({ success: true, message: "Deleted successfully" });
});

export { allContactUsMessages, newContactUsMessage, deleteContactUsMessage };
