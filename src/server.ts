import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import router from "./routes";

const app: express.Application = express();
// const address: string = "0.0.0.0:3000"

app.use(bodyParser.json());
app.use(cors());

app.use("/", router);

const port = 3000;

app.listen(port, function () {
  // console.log(`starting app on: ${address}`)
  console.log(`starting app on: localhost:${port}`);
});
