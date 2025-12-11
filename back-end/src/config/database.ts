import mongoose from "mongoose";
import { logger } from "./logger";

export const connectDB = async (): Promise<void> => {
	const { MONGO_URI, PROJECT_NAME, MONGO_PASSWORD } = process.env;

	if (!MONGO_URI || !PROJECT_NAME || !MONGO_PASSWORD) {
		logger.error("Missing MongoDB environment variables");
		process.exit(1);
	}

	const mongoUri = MONGO_URI.replace(/<PROJECT_NAME>/g, PROJECT_NAME).replace(
		/<MONGO_PASSWORD>/g,
		MONGO_PASSWORD,
	);

	try {
		logger.info("Connecting to MongoDB...");
		await mongoose.connect(mongoUri);
		logger.info("MongoDB connection established");
	} catch (err) {
		logger.error(err, "MongoDB connection failed");
		process.exit(1);
	}
};
