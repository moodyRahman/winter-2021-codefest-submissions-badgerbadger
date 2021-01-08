// TODO: Validate environment variables
require("dotenv").config(); // load environment variables asap
require("module-alias/register");

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import auth from "./routes/auth";
import filter from "./routes/filter";
import rawData from "./routes/raw-data";
import debug from "./routes/debug";

const app = express();

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  throw new Error("Missing MONGO_URI in environment");
}

app.use(bodyParser.json());
app.use(cors());

app.get("/", (_req, res) => res.send("Express + TypeScript Server"));

app.use("/auth", auth);

app.use(filter);
app.use(rawData);
app.use(debug);

mongoose.connection.on("error", console.error);

(async () => {
  await mongoose.connect(MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(
    `🐵[database][${new Date().toLocaleTimeString()}]: connected to remote`
  );

  app.listen(process.env.PORT, () => {
    console.log(
      `⚡[server][${new Date().toLocaleTimeString()}]:`,
      `running on https://localhost:${process.env.PORT}`
    );
  });
})();
