import { Document, Model, Schema, Types, model } from "mongoose";

import { Class } from "@shared/interfaces/class";

import { omit } from "../utils/omit";

export interface ClassDocument extends Document {
  fulfills: string[];
  name: string;
  prereqs: Types.ObjectId[];
}

const ClassSchema = new Schema(
  {
    fulfills: {
      required: true,
      type: [String]
    },
    name: {
      required: true,
      type: String
    },
    prereqs: {
      default: () => [],
      ref: "Class",
      type: [Schema.Types.ObjectId]
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => omit<ClassDocument>(ret, ["_id", "__v"]),
      virtuals: true
    },
    toObject: {
      transform: (_doc, ret) => omit<ClassDocument>(ret, ["_id", "__v"]),
      virtuals: true
    }
  }
);

export const ClassModel = model<ClassDocument, Model<ClassDocument>>(
  "Class",
  ClassSchema
);
