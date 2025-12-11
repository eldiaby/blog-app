import "./config/env";
import { app } from "./app";
import { connectDB } from "./config/database";
import { logger } from "./config/logger";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
	try {
		await connectDB();

		const server = app.listen(PORT, () => {
			logger.info(
				{ port: PORT },
				`Server running in ${process.env.NODE_ENV} mode`,
			);
		});

		// Graceful shutdown
		const shutdown = (signal: string) => {
			logger.info({ signal }, "Shutdown signal received");
			server.close(() => {
				logger.info("HTTP server closed");
				process.exit(0);
			});
		};

		process.on("SIGINT", () => shutdown("SIGINT"));
		process.on("SIGTERM", () => shutdown("SIGTERM"));
	} catch (err) {
		logger.error(err, "Failed to start server");
		process.exit(1);
	}
};

startServer();
