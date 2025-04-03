import {ApiError} from '../utils/api-error.js'
import {ApiResponse} from '../utils/api-response.js'
import {AsyncHandler} from '../utils/asyncHandler.js'

// @Desc: register the user
// @Method: [POST]      /api/v1/user/register
// @Access: public
const registerUser = AsyncHandler(async(req,res,next)=>{
    res.status(200).json(
        new ApiResponse(200,{},"register the user")
    )
})


export {registerUser}