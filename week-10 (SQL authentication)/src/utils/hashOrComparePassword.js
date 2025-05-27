import bcrypt from "bcryptjs";

const hashPassword = async (enterPassword) => {
  return await bcrypt.hash(enterPassword, 10);
};

const comparePassword = async (userEnterPassword, hashPassword) => {
  return await bcrypt.compare(userEnterPassword, hashPassword);
};

export { hashPassword, comparePassword };