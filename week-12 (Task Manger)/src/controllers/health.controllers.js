import { ApiResponse } from "../utils/api-response.js";
import { AsyncHandler } from "../utils/asyncHandler.js";

// @Desc: check the health of api
// @Method: [GET]      /api/v1/health
// @Access: public
const apiHealthCheckup = AsyncHandler(async (req, res, next) => {
  res.status(200).json(
    new ApiResponse(
      200,
      {
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now(),
      },
      "health checkup of API",
    ),
  );
});

export { apiHealthCheckup };
