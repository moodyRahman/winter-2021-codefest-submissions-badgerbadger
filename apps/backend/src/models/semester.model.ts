import { Document, Schema, model } from "mongoose";

import { Semester } from "@shared/interfaces/semester";

import { ClassModel } from "./class.model";
import { UserModel } from "./user.model";

import { omit } from "../utils/omit";

export type SemesterDocument = Semester & Document;

const SemesterSchema = new Schema(
  {
    classes: {
      default: () => [],
      ref: ClassModel,
      type: [Schema.Types.ObjectId],
    },
    name: {
      required: true,
      type: String,
    },
    user: {
      ref: UserModel,
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => omit<SemesterDocument>(ret, ["_id", "__v"]),
      virtuals: true,
    },
    toObject: {
      transform: (_doc, ret) => omit<SemesterDocument>(ret, ["_id", "__v"]),
      virtuals: true,
    },
  }
);

export const SemesterModel = model<SemesterDocument>(
  "Semester",
  SemesterSchema
);
