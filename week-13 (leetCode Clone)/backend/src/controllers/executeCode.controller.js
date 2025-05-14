import { StatusCodes } from "http-status-codes";
import { AsyncHandler } from "../middlewares/asyncHandler.js";
import { ApiError } from "../utils/api-error.js";
import { pollBatchResults, submitBatch } from "../utils/judge0.js";

// @Description: execute the code
// @Method: POST    api/v1/execute-code
// @Access: private/Protect
export const executeCode = AsyncHandler(async (req, res, next) => {
  const { source_code, language_id, stdin, expected_outputs, problemId } =
    req.body;
  const { id } = req.user;
  // validate the test case
  if (
    !Array.isArray(stdin) ||
    stdin.length !== 0 ||
    expected_outputs.length !== stdin.length
  ) {
    return next(
      new ApiError(StatusCodes.BAD_REQUEST, "Invalid or Missing test cases")
    );
  }
  // 2. prepare the each test cases for judge0 batch submission
  const submission = stdin.map((input) => ({
    source_code,
    language_id,
    stdin: input,
  }));

  // 3. send the batch of submission to judge0
  const submissionResp = await submitBatch(submission);

  const token = submissionResp.map((resp) => resp.token);

  //   4. poll judge0 for result of all submission test case
  const results = await pollBatchResults(token);
});
