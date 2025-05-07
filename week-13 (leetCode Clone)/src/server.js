import { app } from "./app.js";

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`the server is running at port ${PORT}`);
});
