import fs from "node:fs/promises";

const deleteLocalFile = async (filePath: string) => {
	try {
		await fs.unlink(filePath);
	} catch (error) {
		console.error(error);
	}
};

export default deleteLocalFile;
