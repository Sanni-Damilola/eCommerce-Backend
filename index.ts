import express, { Application } from "express";

import dotenv from "dotenv";
import { envVariables } from "./Config/environmentVariables";
import { AppConfig } from "./app";
import { DBconnect } from "./Config/DB";

dotenv.config();

const port = envVariables.PORT;

const app: Application = express();

AppConfig(app);
DBconnect();

app.listen(port, () => {
  console.log("");
  console.log(`Server is up and running on port ${port}`);
});



// server => application  => routes => controllerrs => model