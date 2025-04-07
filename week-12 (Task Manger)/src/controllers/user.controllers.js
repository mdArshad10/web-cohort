import { User } from '../models/user.model.js';
import {ApiError} from '../utils/api-error.js'
import {ApiResponse} from '../utils/api-response.js'
import {AsyncHandler} from '../utils/asyncHandler.js'

// cookieOptions
const cookieOptions = {
  httpOnly:true,
  secure:true,
  expireIn:new Date(Date.now + 1000 * 60*60*24*15 )
};



// @Desc: register the user
// @Method: [POST]      /api/v1/user/register
// @Access: public
const registerUser = AsyncHandler(async(req,res,next)=>{
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){ 
      return next(new ApiError(400, "user already present"));
    }
    const newUser = await User.create({
      username,
      email,
      password,
    })

    const accessToken = await newUser.generateAccessToken();
    const refreshToken = await newUser.generateRefreshToken();

    newUser.refreshToken = refreshToken;

    await newUser.save()

    const {password:hashPassword, ...rest} = newUser._doc;

    res.status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .json(
        new ApiResponse(200,{rest},"register the user")
    )
})

// @Desc: login the user
// @Method: [POST]      /api/v1/user/login
// @Access: public
const loginUser = AsyncHandler(async (req, res,next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({email})
  if(!existingUser){
    return next(new ApiError(400, "invalid email or password"))
  }

  const comparePassword = await existingUser.isComparePassword(password);
  if(!comparePassword){
    return next(new ApiError(400, "invalid email or password"))
  }

  const accessToken = await existingUser.generateAccessToken();
  const refreshToken = await existingUser.generateRefreshToken();

  existingUser.refreshToken = refreshToken;

  await existingUser.save();

  const { password: hashPassword, ...rest } = existingUser._doc;

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(200, { rest }, "register the user"));

});

// @Desc: logout the user
// @Method: [POST]      /api/v1/user/logout
// @Access: private
const logoutUser = AsyncHandler(async (req, res,next) => {

});

const verifyEmail = AsyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const resendEmailVerification = AsyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});
const resetForgottenPassword = AsyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const refreshAccessToken = AsyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const forgotPasswordRequest = AsyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const changeCurrentPassword = AsyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const getCurrentUser = AsyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});


export { registerUser, loginUser, logoutUser };