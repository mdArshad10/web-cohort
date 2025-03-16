import { config } from "dotenv";

config({
  path: "src/.env",
});

const PORT = process.env.PORT || 5000;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

export { PORT, SECRET_TOKEN };
