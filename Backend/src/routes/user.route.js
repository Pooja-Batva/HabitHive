import { loginUser, logoutUser, registerUser } from "../controllers/index.js"
import { verifyJWT } from "../middlewares/index.js"
import { Router } from "express"
import { upload } from "../middlewares/index.js";

const userRouter = Router();

userRouter.route("/register").post(upload.none(),registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);


export default userRouter;