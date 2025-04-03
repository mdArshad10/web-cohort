import { app } from "./app.js";
import { PORT } from "./const/envConstant.js";
import { dbConnection } from "./db/dbConnection.js";

dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is running at port => ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongoose Connection error", err);
    process.exit(1);
  });
