import { AsyncHandler } from "../middlewares/asyncHandler.js";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/api-response.js";

// @Description: health checkup of rest api
// @Method: POST    api/v1/health
// @Access: public
const apiHealthCheckup = AsyncHandler(async (req, res, next) => {
  res.status(200).json(
    new ApiResponse(
      StatusCodes.OK,
      {
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now(),
      },
      "health checkup of API"
    )
  );
});

export { apiHealthCheckup };
