import User from "../models/user.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {sendEmail,welcomeEMail} from "../utils/mailer.js"

const generateAccessAndRefreshToken = async (userId)=>{
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404,"User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave : false});
    return {accessToken,refreshToken};
}

const createUser = asyncHandler(async(req , res)=>{
    const {name,email,password}=req.body;

    if(!email || !password)
    {
        throw new ApiError(401,"Email or Password not founc")
    }

    const existingUser = await User.findOne({email});

    if(existingUser)
    {
        throw  new ApiError(409,"User already exists")
    }

    const user = await User.create({name,email,password})

    const createdUser = await User.findById(user._id).select("-password")

    if(!createUser)
    {
        throw new ApiError(500,"Something went wrong")
    }

    welcomeEMail(user.email)

    return res
    .status(201)
    .json(
        new ApiResponse(201,createUser,"User Created Sucessfully")
    )
})

const loginUser = asyncHandler(async (req,res)=>{

    const {email,password} = req.body;
    if(!email || !password)
    {
        throw new ApiError(401,"Email or Password not founc")
    }

    const user = await User.findOne({email})
    if(!user)
    {
        throw new ApiError(404,"User Not Found")
    }

    const isPassCorr = await user.isPasswordValid(password);
    if(!isPassCorr)
    {
        throw new ApiError(401,"Password is incorrect")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -createdAt -updatedAt")

    welcomeEMail(loggedInUser.email)

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("refreshToken",refreshToken,options)
    .cookie("accessToken",accessToken,options)
    .json({
        success: true,
        message: "Login Successfully",
        user: loggedInUser
    })
})


export {
    createUser,
    loginUser
}