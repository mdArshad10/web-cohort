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
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(new ApiError(StatusCodes.UNAUTHORIZED, "your are not allowed"));
  }

  for (const [language, solutionCode] of Object.entries(referenceSolution)) {
    const languageId = getLanguageIdByJudge0(language);
    if (!languageId) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(
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
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(
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
