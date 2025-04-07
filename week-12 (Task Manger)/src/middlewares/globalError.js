import {ApiError} from '../utils/api-error.js'

export const ErrorMiddleware = (err,req,res,next) =>{
    const message = err.message ?? "something want wrong"
    const statusCode = err.statusCode ?? 500;
    
    res.status(statusCode).json({
        message,
        success:false,
        stack:err.stack
    })
}