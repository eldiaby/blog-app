import type { IUser } from "../../@types/user.type";
import { createToken } from "../../utils/jwt";
import { UserModule } from "../user/user.module";

const createUser = async (user: IUser) => {
	const existingUser = await UserModule.service.getUserByEmail(user.email);
	if (existingUser) {
		throw new Error("Email already exists");
	}

	const newUser = await UserModule.service.createUser(user);

	const { password: _, passwordConfirm: _2, ...userSafe } = newUser.toObject();

	return userSafe;
};

const login = async (email: string, password: string) => {
	const userRecord = await UserModule.service.getUserByEmail(email, {
		selectPassword: true,
	});

	if (!userRecord) throw new Error("No account found with the provided email.");

	if (!userRecord.isActive)
		throw new Error("Your account is not active. Please contact support.");

	const isPasswordValid = await userRecord.comparePassword(password);

	if (!isPasswordValid)
		throw new Error("Invalid email or password. Please try again.");

	const userPayload = {
		id: userRecord._id.toString(),
		email: userRecord.email,
		role: userRecord.role,
		profilePhoto: userRecord.profilePhoto,
	};

	const authToken = createToken(userPayload);

	return { token: authToken, user: userPayload };
};

export default {
	createUser,
	login,
};
