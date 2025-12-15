import { Router } from "express";
import { IUserRole } from "../../@types/user.type";

import { authentication } from "../../middlewares/authentication";
import { authorization } from "../../middlewares/authorization";
import { restrictTo } from "../../middlewares/restrictTo";
import { sanitizeBody } from "../../middlewares/sanitizeBody";
import { validateBody } from "../../middlewares/validateBody";
import { validateObjectId } from "../../middlewares/validateObjectId";

import { updateUserSchema } from "./../../shcemas/user.shcema";

import { userController } from "./user.controller";

const router = Router();

router.get(
	"/",
	authentication,
	restrictTo(IUserRole.ADMIN),
	userController.getAll,
);
router.get("/:id", validateObjectId, userController.getOne);
router.post(
	"/",
	authentication,
	restrictTo(IUserRole.ADMIN),
	userController.create,
);
router.put(
	"/:id",
	validateObjectId,
	authentication,
	sanitizeBody(["name", "email", "password", "passwordConfirm", "bio"]),
	validateBody(updateUserSchema),
	authorization,
	userController.update,
);
router.delete("/:id", authentication, authorization, userController.remove);

export default router;
