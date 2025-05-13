import { AsyncHandler } from "../middlewares/asyncHandler.js";
import { ApiError } from "../utils/api-error.js";
import { db } from "../lib/db.js";
import { ApiResponse } from "../utils/api-response.js";
import { StatusCodes } from "http-status-codes";
import { getLanguageIdByJudge0, submitAtJudge0 } from "../utils/judge0.js";

// @Description: create a problem
// @Method: POST    api/v1/problems
// @Access: private
const createProblem = AsyncHandler(async (req, res, next) => {
  // get a required data
  const {
    title,
    description,
    difficulty,
    tags,
    example,
    constraints,
    testCases,
    codeSnippets,
    referenceSolution,
  } = req.body;
  const user = req.user;

  // check the role also
  if (user.role !== "ADMIN") {
    return next(
      new ApiError(
        StatusCodes.UNAUTHORIZED,
        `your are not allowed to perform this task`
      )
    );
  }

  for (const [language, solutionCode] of Object.entries(referenceSolution)) {
    const languageId = getLanguageIdByJudge0(language);
    if (!languageId) {
      return next(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          `language ${language} is not supported`
        )
      );
    }

    const submission = testCases.map(({ input, output }) => ({
      source_code: solutionCode,
      language_id: languageId,
      stdin: input,
      expected_output: output,
    }));

    const submissionResult = await submitAtJudge0(submission);

    const tokens = submissionResult.map((result) => result.token);

    const results = await pollBatchResults(tokens);

    for (let index = 0; index < results.length; index++) {
      const result = results[index];
      if (!result.status.id !== 3) {
        return next(
          new ApiError(
            StatusCodes.BAD_REQUEST,
            `Testcase ${index + 1} failed for language ${language}`
          )
        );
      }
    }

    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        example,
        constraints,
        testCases,
        codeSnippets,
        referenceSolution,
        languageId,
        userId: user.id,
      },
    });

    res
      .status(StatusCodes.CREATED)
      .json(
        new ApiResponse(
          StatusCodes.CREATED,
          newProblem,
          "new problem is created"
        )
      );
  }
});

// @Description: get all problem
// @Method: GET    api/v1/problems
// @Access: public
const getAllProblem = AsyncHandler(async (req, res, next) => {
  // add the filter also,
  const limit = Number(req.query?.limit) ?? 10;
  const page = Number(req.query?.page) ?? 1;
  const skip = (page - 1) * limit;
  const allProblem = await db.problem.findMany({
    take: limit,
    skip,
  });

  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, allProblem, "get all Problem"));
});

// @Description: get a problem
// @Method: GET    api/v1/users/problems/:id
// @Access: public
const getProblem = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const problem = await db.problem.findUnique({
    where: {
      id,
    },
  });

  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, problem, "get a particular problem"));
});

// @Description: update
// @Method: PATCH    api/v1/users/problems/:id
// @Access: private
const updateProblem = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
});

// @Description: delete
// @Method: DELETE    api/v1/users/problems/:id
// @Access: private
const deleteProblem = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const problem = await db.problem.findUnique({
    where: {
      id,
    },
  });
  if (!problem) {
    return next(new ApiError(StatusCodes.BAD_REQUEST, "problem is not exist"));
  }
  await db.problem.delete({
    where: {
      id,
    },
  });
  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, {}, "delete the problem successfully")
    );
});

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
