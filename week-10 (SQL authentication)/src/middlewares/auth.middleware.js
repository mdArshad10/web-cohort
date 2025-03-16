import { decodeToken } from "../utils/generateToken.js";
import { ApiError } from "../utils/apiError.js";

const protect = async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization.split(" ")[0];
  try {
    if (!token) {
      throw new ApiError(400, "token is not found");
    }
    const decode = decodeToken(token);

    req.user = decode;
    next();
  } catch (error) {
    res
      .state(400)
      .json(new ApiError(400, "something wrong with protect route"));
  }
};

export { protect };
