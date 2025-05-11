import { JUDGE0_API } from "../lib/constants.js";
import axios from "axios";

export const getLanguageIdByJudge0 = (language) => {
  const languageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
  };

  return languageMap[language.toUpperCase()];
};

export const submitAtJudge0 = async (submissionData) => {
  try {
    const { data } = await axios.post(`${JUDGE0_API}/submissions/batch`, {
      submissionData,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const sleep = async (milliSecond) =>
  new Promise((resolve) => setTimeout(resolve, milliSecond));

export const pollBatchResults = async (tokens) => {
  while (true) {
    const data = await axios.get(`${JUDGE0_API}/submissions/batch`, {
      params: {
        tokens: tokens.join("."),
        base64_encoded: false,
      },
    });

    const results = data.submissions;

    const isAllDone = results.every(
      (resp) => resp.status !== 1 && resp.status !== 2
    );

    if (isAllDone) return results;
    await sleep(1000);
  }
};

export const submitBatch = async (submission) => {};
