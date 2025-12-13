import type { Request, Response, NextFunction } from "express";
import { performance } from "perf_hooks";
import chalk from "chalk";
import { logger } from "../config/logger";

/**
 * Middleware to log HTTP requests in a detailed and color-coded format.
 * Only active in development or test environments.
 *
 * Logs include:
 * - Request ID
 * - Method & URL
 * - Status code
 * - Duration in milliseconds
 * - Client IP & User-Agent
 * - Query parameters
 * - Request body (with sensitive fields masked)
 * - Response (if provided)
 */
export const requestLogger = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (!["development", "test"].includes(process.env.NODE_ENV || "")) {
		return next();
	}

	// Track start time
	const start = performance.now();

	// Generate or use existing correlation ID
	const reqId =
		req.headers["x-request-id"]?.toString() || req.id || crypto.randomUUID();
	req.id = reqId;

	// Mask sensitive fields in body
	const safeBody = { ...req.body };
	if (safeBody.password) safeBody.password = "*****";
	if (safeBody.passwordConfirm) safeBody.passwordConfirm = "*****";

	// After response finishes, log details
	res.on("finish", () => {
		const duration = performance.now() - start;

		const logHeader = chalk.magenta.bold("=== REQUEST LOG ===");
		const logFooter = chalk.magenta.bold("=== END REQUEST ===");

		console.log(logHeader);
		console.log(`${chalk.cyan("ID:")}            ${reqId}`);
		console.log(`${chalk.cyan("Method:")}        ${chalk.blue(req.method)}`);
		console.log(
			`${chalk.cyan("URL:")}           ${chalk.green(req.originalUrl)}`,
		);
		console.log(
			`${chalk.cyan("Status:")}        ${
				res.statusCode >= 500
					? chalk.red(res.statusCode)
					: res.statusCode >= 400
						? chalk.yellow(res.statusCode)
						: chalk.green(res.statusCode)
			}`,
		);
		console.log(`${chalk.cyan("Duration:")}      ${duration.toFixed(2)}ms`);
		console.log(`${chalk.cyan("IP:")}            ${req.ip}`);
		console.log(`${chalk.cyan("User-Agent:")}    ${req.headers["user-agent"]}`);
		console.log(
			`${chalk.cyan("Query:")}         ${JSON.stringify(req.query, null, 2)}`,
		);
		console.log(
			`${chalk.cyan("Body:")}          ${JSON.stringify(safeBody, null, 2)}`,
		);
		console.log(
			`${chalk.cyan("Response:")}      ${res.locals.body ? JSON.stringify(res.locals.body, null, 2) : "-"}`,
		);
		console.log(logFooter);

		// Optional: also log via pino
		logger.info({
			req: { id: reqId, method: req.method, url: req.originalUrl },
			res: { statusCode: res.statusCode },
			responseTime: duration.toFixed(2),
			message: "request completed",
		});
	});

	next();
};
