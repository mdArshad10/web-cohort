import { app } from "./app.js";
import {PORT} from './content.js'


function serverSetupAndStart() {
  app.listen(PORT, () => {
    console.log(`The server is running at port => ${PORT}`);
  });
}

serverSetupAndStart();
