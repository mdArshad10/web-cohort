import { AsyncHandler } from "../middlewares/asyncHandler.js";
import { ApiError } from "../utils/api-error.js";
import { db } from "../lib/db.js";
import { ApiResponse } from "../utils/api-response.js";
import { StatusCodes } from "http-status-codes";

// @Description: create a problem
// @Method: POST    api/v1/problems
// @Access: private
const createProblem = AsyncHandler(async (req, res, next) => {});

// @Description: get all problem
// @Method: GET    api/v1/problems
// @Access: public
const getAllProblem = AsyncHandler(async (req, res, next) => {});

// @Description: get a problem
// @Method: GET    api/v1/users/problems/:id
// @Access: public
const getProblem = AsyncHandler(async (req, res, next) => {});

// @Description: update
// @Method: PATCH    api/v1/users/problems/:id
// @Access: private
const updateProblem = AsyncHandler(async (req, res, next) => {});

// @Description: delete
// @Method: DELETE    api/v1/users/problems/:id
// @Access: private
const deleteProblem = AsyncHandler(async (req, res, next) => {});

// @Description: get the solved problem
// @Method: get    api/v1/users/problems/solved
// @Access: private
const solvedProblem = AsyncHandler(async (req, res, next) => {});

export {
  createProblem,
  getAllProblem,
  getProblem,
  updateProblem,
  deleteProblem,
  solvedProblem,
};
