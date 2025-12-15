import cloudinary from "../config/cloudinary";

export const uploadImage = async (imagePath: string) => {
	// Use the uploaded file's name as the asset's public ID and
	// allow overwriting the asset with new versions
	const options = {
		use_filename: true,
		unique_filename: false,
		overwrite: true,
		folder: process.env.PROJECT_NAME,
	};

	try {
		// Upload the image
		const result = await cloudinary.uploader.upload(imagePath, options);
		return result;
	} catch (error) {
		console.error(error);
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
