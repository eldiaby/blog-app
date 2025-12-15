import { sign, verify } from "jsonwebtoken";
import type { JwtPayload } from "../@types/auth.type";

export const generateAuthToken = (payload: JwtPayload): string => {
	if (!process.env.JWT_SECRET) {
		throw new Error("JWT_SECRET is not defined in .env");
	}

	return sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyAuthToken = (token: string): JwtPayload => {
	if (!process.env.JWT_SECRET) {
		throw new Error("JWT_SECRET is not defined in .env");
	}

	return verify(token, process.env.JWT_SECRET) as JwtPayload;
};
