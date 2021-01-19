import { Document, Model, Schema, Types, model } from "mongoose";

import { Semester } from "@shared/interfaces/semester";

import { ClassDocument, ClassModel } from "./class.model";
import { UserDocument, UserModel } from "./user.model";

import { omit } from "../utils/omit";

export interface SemesterDocument extends Document {
  classes: Types.Array<Types.ObjectId>;
  name: string;
  user: Types.ObjectId;
}

export interface PopulatedSemesterDocument {
  classes: ClassDocument[];
  user: UserDocument;
}

const SemesterSchema = new Schema(
  {
    classes: {
      default: () => [],
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

export const SemesterModel = model<SemesterDocument, Model<SemesterDocument>>(
  "Semester",
  SemesterSchema
);
