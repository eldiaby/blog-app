import { z } from "zod";

export const registerSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email(), // الرسالة الافتراضية
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(16, "Password must be at most 16 characters")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
			"Password must contain uppercase, lowercase, number and special character",
		),
	passwordConfirm: z.string(),
});

/**
 * Schema for user login
 */
export const loginSchema = z.object({
	email: z
		.string()
		.email()
		.refine((val) => !!val, {
			message: "Invalid email address",
		}),
	password: z.string().min(8, "Password must be at least 8 characters"),
});
