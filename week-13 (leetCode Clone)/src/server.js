import { app } from "./app.js";
import { PORT } from "./lib/constants.js";

app.listen(PORT, () => {
  console.log(`the server is running at port ${PORT}`);
});
