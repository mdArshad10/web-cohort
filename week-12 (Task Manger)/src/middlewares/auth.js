import { ACCESS_TOKEN } from "../const/envConstant.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import jwt from 'jsonwebtoken'

export const protect = async(req,res,next)=>{
    const token = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];
    try {
      if(!token){
        return next(new ApiError(400, "invalid token"))
      }
      const decode = await jwt.verify(token, ACCESS_TOKEN);
      if(!decode){
        return next(new ApiError(400, "invalid token"))
      }
      const user = await User.findById(decode.id).select('-password');
      if(!user){
        return next(new ApiError(400, "user is not created"))
      }
      req.user = user;
      next();
    } catch (error) {
        const statusCode = error.statusCode ?? 500;
        const message = error.message ?? "something want wrong"
      return res.status(statusCode).json(new ApiError(statusCode, message))
    }
}