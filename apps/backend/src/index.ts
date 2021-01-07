require("dotenv").config(); // load environment variables asap
require("module-alias/register");

import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import Mongoose from "mongoose";

import auth from "./routes/auth";
import filter from "./routes/filter";
import rawData from "./routes/raw-data";
import debug from "./routes/debug";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (_req, res) => res.send("Express + TypeScript Server"));

app.use("/auth", auth);

app.use(filter);
app.use(rawData);
app.use(debug);

Mongoose.connection.on("error", (err) => {
  console.log(err);
});

Mongoose.connection.once("open", () => {
  console.log(
    `🐵[database][${new Date().toLocaleTimeString()}]: connected to remote`
  );
});

(async () => {
  await Mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  app.listen(process.env.PORT, () => {
    console.log(
      `⚡[server][${new Date().toLocaleTimeString()}]:`,
      `running on https://localhost:${process.env.PORT}`
    );
  });
})();
