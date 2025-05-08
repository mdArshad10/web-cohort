import {AsyncHandler} from '../middlewares/asyncHandler.js'
import {ApiError} from '../utils/error.js'
import {db} from '../lib/db.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// @Description: register the user 
// @Method: POST    api/v1/users/register 
// @Access: public
const register = AsyncHandler(async(req,res,next)=>{
    const {username, email, password}=req.body;
    
})

export {register}