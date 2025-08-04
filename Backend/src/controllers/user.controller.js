import { User } from "../models/user.model.js";
import { apiError, asyncHandler } from "../utils/index.js";


const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessAndRefreshToken();
        const refreshToken = user.generateAccessAndRefreshToken();
    
        // save refresh tokem
        user.refreshToken = refreshToken;
        user.save({validateBeforeSave : false});
    
        return {accessToken, refreshToken}
    } catch (error) {
        throw new apiError(500, "Something went wrong while generating refresh and access token");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // fetch data
    const {username, email, password} = req.body;

    // validation
    if([username, email, password].some(field => !field)){
        throw new apiError(400, "All fields are required");
    }

    // check if user already exist
    const existedUser = await User.findOne(
        {
            $or : [{username}, {email}]
        }
    );

    if(existedUser){
        throw new apiError(409, "user with email or username already exist");
    }

    // database save
    const user = await User.create(
        {
            username,
            email,
            password
        }
    );

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // if db save error
    if(!createdUser){
        throw new apiError(500, "something went wrong while register user"); 
    }

    return res
    .status(201)
    .json(
        200,
        createdUser,
        "User Register successfully"
    )
});

const loginUser = asyncHandler(async(req, res) => {
    // fetch data
    const {username, email, password} = req.body;

    // validation
    if(!username && !email){
        throw new apiError(400, "username or email is required");
    }

    // user find
    const user = await User.findOne({
        $or : [{username}, {email}]
    })
    if(!user){
        throw new apiError(404, "User does not exist");
    }

    // password verification
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new apiError(401, "Your credentials are wrong");
    }

    // access and refresh token
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const loggedinUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // cookie send 
    
    // only modify server
    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
        200, 
        {
            user : loggedinUser, accessToken, refreshToken
        },
        "User logged in successfully"
    )
})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken : 1
            }
        },
        {
            new : true
        }
    );

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearcookie("accessToken", options)
    .clearcookie("refreshToken", options)
    .json(
        200, 
        {},
        "User Logged out"
    )
});


export {
    generateAccessAndRefreshToken,
    registerUser,
    loginUser,
    logoutUser,
}