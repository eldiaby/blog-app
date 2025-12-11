// import type { IUserDocument } from "../user/user.types";

declare global {
	namespace Express {
		interface UserPayload {
			id: string;
			name: string;
			phone?: string;
			role: "admin" | "lawyer" | "client";
			token?: string;
		}

		interface Request {
			user?: UserPayload;
		}
	}
}
