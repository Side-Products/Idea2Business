import mongoose from "mongoose";

const dbConnect = () => {
	if (mongoose.connection.readyState >= 1) {
		return;
	}
	mongoose
		.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((conn) => console.log("Connected to MongoDB"));
};

export default dbConnect;
