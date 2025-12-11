import compression from "compression";
import express from "express";
import pinoHttp from "pino-http";
import { v4 as uuidv4 } from "uuid";
import { logger } from "./config/logger";

export const app = express();

app.use(express.json());
app.use(compression());

// Add Correlation ID middleware
app.use((req, _, next) => {
	req.id = req.headers["x-request-id"]?.toString() || uuidv4();
	next();
});

// Attach HTTP logger
app.use(
	pinoHttp({
		logger,
		genReqId: (req) => req.id as string,
		customLogLevel: (_, res, err) => {
			if (err || res.statusCode >= 500) return "error";
			if (res.statusCode >= 400) return "warn";
			return "info";
		},
		serializers: {
			req(req) {
				return {
					id: req.id,
					method: req.method,
					url: req.url,
				};
			},
			res(res) {
				return {
					statusCode: res.statusCode,
				};
			},
		},
	}),
);

// Example route
app.get("/", (_, res) => res.send("API is running..."));
