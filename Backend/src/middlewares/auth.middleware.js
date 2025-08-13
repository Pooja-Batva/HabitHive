import {User} from "../models/index.js";
import {apiError, asyncHandler} from "../utils/index.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Autheration")?.replace("Bearer ", "");

        if(!token){
            throw new apiError(401, "Unauthorized User")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        )

        if(!user){
            throw new apiError(401, "Invalid Access Token")
        }

        req.user = user;

        next();

    } catch (error) {
        throw new apiError(401, "Invalid Access Token.")
    }
});

export {verifyJWT}