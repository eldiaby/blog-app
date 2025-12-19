import { Router } from "express";
import { authentication } from "../../middlewares/authentication";
import { authorization } from "../../middlewares/authorization";
import { sanitizeBody } from "../../middlewares/sanitizeBody";
import { validateBody } from "../../middlewares/validateBody";
import { createCommentSchema } from "../../shcemas/comment.schema";
import commentController from "./comment.controller";
import { restrictTo } from "../../middlewares/restrictTo";
import { IUserRole } from "../../@types/user.type";

const router = Router();

router.post(
	"/",
	authentication,
	authorization,
	sanitizeBody(["content", "postId"]),
	validateBody(createCommentSchema),
	commentController.createComment,
);

router.get(
	"/",
	authentication,
	restrictTo(IUserRole.ADMIN),
	commentController.getAllComments,
);



export default router;
