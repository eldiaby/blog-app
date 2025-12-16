import cloudinary from "../config/cloudinary";
import deleteLocalFile from "./deleteLocalFile";

export type UploadFolder = "users/avatars" | "posts/covers";

interface UploadImageOptions {
	removeAfterUpload?: boolean;
}

export const uploadImageFromPath = async (
	imagePath: string,
	folder: UploadFolder,
	options: UploadImageOptions = { removeAfterUpload: true },
) => {
	const uploadOptions = {
		use_filename: true,
		unique_filename: false,
		overwrite: true,
		folder: `${process.env.PROJECT_NAME}/${folder}`,
	};

	try {
		const result = await cloudinary.uploader.upload(imagePath, uploadOptions);

		if (options.removeAfterUpload) {
			await deleteLocalFile(imagePath);
		}

		return result;
	} catch (error) {
		console.error("Cloudinary upload failed:", error);
		throw error;
	}
};

export const removeImage = async (imagePublicId: string) => {
	try {
		// Remove the image
		const result = await cloudinary.uploader.destroy(imagePublicId);
		return result;
	} catch (error) {
		console.error(error);
	}
};
