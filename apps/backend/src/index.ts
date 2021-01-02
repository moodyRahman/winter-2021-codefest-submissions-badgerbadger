require("dotenv").config(); // load environment variables asap

import cors from "cors";
import express from "express";

import auth from "./routes/auth";
import filter from "./routes/filter";
import rawData from "./routes/raw-data";
import debug from "./routes/debug"

const app = express();

app.use(cors());

app.get("/", (_req, res) => res.send("Express + TypeScript Server"));

app.use("/auth", auth);

app.use(filter);
app.use(rawData);
app.use(debug)

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server][${new Date().toLocaleTimeString()}]:`,
    `Server is running at https://localhost:${process.env.PORT}`
  );
});
