import mongoose from "mongoose";

const dbConnect = () => {
	if (mongoose.connection.readyState >= 1) {
		return;
	}
	try {
		mongoose
			.connect(process.env.MONGODB_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then((conn) => console.log("Connected to MongoDB"));
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default dbConnect;
