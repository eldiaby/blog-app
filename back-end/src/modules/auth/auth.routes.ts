import { Router } from "express";

import { sanitizeBodyMiddleware } from "../../middlewares/sanitizeBodyMiddleware";
import { validateBody } from "../../middlewares/validateBody";

import { loginSchema, registerSchema } from "../../shcemas/auth.shcema";

import authController from "./auth.controller";

const router = Router();

router.post(
	`/regester`,
	sanitizeBodyMiddleware(["name", "email", "password", "passwordConfirm"]),
	validateBody(registerSchema),
	authController.register,
);

router.post(
	`/login`,
	sanitizeBodyMiddleware([`email`, "password"]),
	validateBody(loginSchema),
	authController.login,
);

export default router;
