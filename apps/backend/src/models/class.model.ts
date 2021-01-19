import { Document, Schema, Types, model } from "mongoose";

import { omit } from "../utils/omit";

// TODO: dtos should use ClassDocument interface for single source of truth
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

export const ClassModel = model<ClassDocument>("Class", ClassSchema);
