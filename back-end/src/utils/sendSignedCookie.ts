import type { Response } from "express";

interface SendSignedCookieOptions {
	res: Response;
	name: string;
	data: unknown;
	httpOnly?: boolean;
	secure?: boolean;
	sameSite?: "strict" | "lax" | "none";
}

export const sendSignedCookie = ({
	res,
	name,
	data,
	httpOnly = process.env.NODE_ENV === "production",
	secure = process.env.NODE_ENV === "production",
	sameSite = process.env.NODE_ENV === "production" ? "strict" : "lax",
}: SendSignedCookieOptions) => {
	res.cookie(name, typeof data === "string" ? data : JSON.stringify(data), {
		signed: true,
		httpOnly,
		secure,
		sameSite,
	});
};
