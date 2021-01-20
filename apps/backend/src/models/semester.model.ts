import { Document, Schema, Types, model } from "mongoose";

import { ClassModel } from "./class.model";
import { UserModel } from "./user.model";

import { omit } from "../utils/omit";

// TODO: dtos should use SemesterDocument interface for single source of truth
export interface SemesterDocument extends Document {
  classes: Types.Array<Types.ObjectId>;
  name: string;
  user: Types.ObjectId;
}

const SemesterSchema = new Schema(
  {
    classes: {
      ref: ClassModel,
      type: [Schema.Types.ObjectId],
      validate: (value: Types.ObjectId[]) => value.length < 30
    },
    name: {
      maxlength: 64,
      required: true,
      type: String
    },
    user: {
      ref: UserModel,
      required: true,
      type: Schema.Types.ObjectId
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => omit<SemesterDocument>(ret, ["_id", "__v"]),
      virtuals: true
    },
    toObject: {
      transform: (_doc, ret) => omit<SemesterDocument>(ret, ["_id", "__v"]),
      virtuals: true
    }
  }
);

export const SemesterModel = model<SemesterDocument>(
  "Semester",
  SemesterSchema
);
