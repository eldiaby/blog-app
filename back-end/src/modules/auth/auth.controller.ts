import type { Request, Response } from "express";
import apiResponse from "./../../utils/apiResponse";
import { authModule } from "./auth.module";

const register = async (req: Request, res: Response) => {
	const user = await authModule.service.createUser(req.body);

	apiResponse(res, {
		data: user,
		message: `Hello ${user.name}! Your account has been registered successfully. Please verify your email to activate your account.`,
	});
};

const login = async (req: Request, res: Response) => {
	console.log(req.body);
	const data = await authModule.service.login(
		req.body.email,
		req.body.password,
	);
	apiResponse(res, { message: `User authenticated successfully`, data });
};

export default {
	register,
	login,
};
