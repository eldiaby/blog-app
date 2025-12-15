import { z } from "zod";
import { passwordRegex } from "./../constants/regex";

export const updateUserSchema = z
	.object({
		name: z.string().min(1, "Name is required").optional(),
		email: z.string().email("Invalid email address").optional(),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.max(16, "Password must be at most 16 characters")
			.regex(
				passwordRegex,
				"Password must contain uppercase, lowercase, number and special character",
			)
			.optional(),
		passwordConfirm: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		// لو حد بعت password لازم يبعت confirm
		if (data.password && !data.passwordConfirm) {
			ctx.addIssue({
				path: ["passwordConfirm"],
				message: "Password confirmation is required",
				code: z.ZodIssueCode.custom,
			});
		}

		// لو الاتنين موجودين لازم يكونوا زي بعض
		if (
			data.password &&
			data.passwordConfirm &&
			data.password !== data.passwordConfirm
		) {
			ctx.addIssue({
				path: ["passwordConfirm"],
				message: "Passwords do not match",
				code: z.ZodIssueCode.custom,
			});
		}
	});
