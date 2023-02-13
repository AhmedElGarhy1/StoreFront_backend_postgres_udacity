import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routes";

dotenv.config();

const app: express.Application = express();
// const address: string = "0.0.0.0:3000"

app.use(bodyParser.json());
app.use(cors());

app.use("/", router);

const port = process.env.PORT || 8000;

app.listen(port, function () {
  // console.log(`starting app on: ${address}`)
  console.log(`starting app on: localhost:${port}`);
});

export default app;
