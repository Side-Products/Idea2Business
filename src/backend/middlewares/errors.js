import ErrorHandler from "@/backend/utils/errorHandler";

// eslint-disable-next-line import/no-anonymous-default-export
export default (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;

	let error = { ...err };

	error.message = err.message;

	// Wrong Mongoose Object ID Error
	if (err.name === "CastError") {
		const message = `Resource not found. Invalid: ${err.path}`;
		error = new ErrorHandler(message, 400);
	}

	// Handling Mongoose Validation Error
	if (err.name === "ValidationError") {
		const message = Object.values(err.errors).map((value) => value.message);
		error = new ErrorHandler(message[0], 400);
	}

	// OpenAI API error
	if (err.message === "Request failed with status code 429") {
		const message = `Our servers are at capacity. Please try again later.`;
		error = new ErrorHandler(message, 400);
	}

	res.status(err.statusCode).json({
		success: false,
		error,
		message: error.message || "Internal Server Error",
		stack: error.stack,
	});
};
