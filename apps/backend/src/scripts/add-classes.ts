import fs from "fs";
import path from "path";

import mongoose from "mongoose";

import { Class } from "@shared/interfaces/Class";

import config from "../config";

import { ClassModel } from "../models/class.model";

(async () => {
  await mongoose.connect(config.get("mongo_uri"), {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const buffer = fs.readFileSync(path.join(__dirname, "./classes.json"));

  const classes: Class[] = JSON.parse(buffer.toString());

  for (const classObj of classes) {
    const classDoc = new ClassModel();

    classDoc.fulfills = classObj.fulfills;
    classDoc.name = classObj.name;
    classDoc.prereqs = new mongoose.Types.Array();

    if (classObj.prereqs.length) {
      for (const prereq of classObj.prereqs) {
        const prereqDoc = await ClassModel.findOne({ name: prereq.name });

        if (prereqDoc) {
          classDoc.prereqs.push(prereqDoc.id);
        }
      }
    }

    await classDoc.save();
  }

  console.log("Done");
})();
