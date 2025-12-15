import { Router } from "express";

import { sanitizeBody } from "../../middlewares/sanitizeBody";
import { validateBody } from "../../middlewares/validateBody";

import { loginSchema, registerSchema } from "../../shcemas/auth.shcema";

import authController from "./auth.controller";

const router = Router();

router.post(
	`/regester`,
	sanitizeBody(["name", "email", "password", "passwordConfirm"]),
	validateBody(registerSchema),
	authController.register,
);

router.post(
	`/login`,
	sanitizeBody([`email`, "password"]),
	validateBody(loginSchema),
	authController.login,
);

export default router;
