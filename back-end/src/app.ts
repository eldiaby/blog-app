import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import pinoHttp from "pino-http";
import { v4 as uuidv4 } from "uuid";
import { logger } from "./config/logger";
import { requestLogger } from "./middlewares/requestLogger";

import { authModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";

export const app = express();

app.use(express.json());
app.use(compression());
app.use(cookieParser());

/** 1) Correlation ID */
app.use((req, _, next) => {
	req.id = req.headers["x-request-id"]?.toString() || uuidv4();
	next();
});

/** 2) Request Logger (Your custom logger) */
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
	app.use(requestLogger);
}

/** 3) Pino HTTP Logger */
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

/** 4) Routers */
app.use("/api/v1/auth", authModule.router);
app.use("/api/v1/users", UserModule.router);

app.get("/", (_, res) => res.send("API is running..."));
