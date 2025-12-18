import fs from "node:fs";
import path from "node:path";

import type { NextFunction, Request, Response } from "express";

import multer from "multer";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

const multerStorage = multer.memoryStorage();

const multerFilter = (
	_: Request,
	file: Express.Multer.File,
	cb: multer.FileFilterCallback,
) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("Only images are allowed!"));
	}
};

export const uploadImage = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
	limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

export const handleImage =
	({ throwError = true }: { throwError?: boolean }) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!req.file && !throwError) next();
			else if (!req.file) {
				return res.status(400).json({ message: "No file uploaded" });
			}

			const fileName = `image-${uuidv4()}.jpeg`;

			if (!fs.existsSync(path.join(__dirname, "..", "public", "images"))) {
				fs.mkdirSync(path.join(__dirname, "..", "public", "images"));
			}

			const outputPath = path.join(
				__dirname,
				"..",
				"public",
				"images",
				fileName,
			);

			await sharp(req.file.buffer)
				.resize(800, 800, { fit: "inside" })
				.toFormat("jpeg")
				.jpeg({ quality: 90 })
				.toFile(outputPath);

			req.file.path = outputPath;
			next();
		} catch (err) {
			next(err);
		}
	};
