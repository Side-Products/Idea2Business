import mongoose from "mongoose";

const dbConnect = async () => {
	if (mongoose.connection.readyState >= 1) {
		console.log("Already connected to DB");
		return;
	}
	try {
		await mongoose
			.connect(process.env.MONGODB_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then((conn) => console.log("Connected to MongoDB"));
	} catch (error) {
		console.log("DB Connection Error:", error);
		process.exit(1);
	}
};

export default dbConnect;
