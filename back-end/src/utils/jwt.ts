import { sign } from "jsonwebtoken";

interface JwtPayload {
	id: string;
	email?: string;
	role?: string;
	profilePhoto?: {
		uri: string;
		publicID: string | null;
	};
	[key: string]: any; // لو عايز تسمح بأي بيانات إضافية
}

export const createToken = (payload: JwtPayload): string => {
	if (!process.env.JWT_SECRET) {
		throw new Error("JWT_SECRET is not defined in .env");
	}

	return sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};
