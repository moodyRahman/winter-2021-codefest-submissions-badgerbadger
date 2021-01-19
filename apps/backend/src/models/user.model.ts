import bcrypt from "bcrypt";

import { Document, Model, Schema, model } from "mongoose";

import { User } from "@shared/interfaces/user";

import config from "../config";

import { omit } from "../utils/omit";

type UserDocumentType = User & Document;

export interface UserDocument extends UserDocumentType {
  password: string;

  comparePassword(plainText: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    displayName: {
      minlength: 4,
      maxlength: 32,
      type: String,
      unique: true,
      validate: /^[a-z0-9]+$/i,
    },
    password: {
      required: true,
      type: String,
    },
    username: {
      minlength: 4,
      maxlength: 32,
      required: true,
      type: String,
      unique: true,
      validate: /^[a-z0-9]+$/i,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => omit<UserDocument>(ret, ["_id", "__v"]),
      virtuals: true,
    },
    toObject: {
      transform: (_doc, ret) => omit<UserDocument>(ret, ["_id", "__v"]),
      virtuals: true,
    },
  }
);

UserSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, config.get("bcrypt_cost"));

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("username")) return next();

  this.displayName = this.username;
  this.username = this.username.toLowerCase();

  next();
});

UserSchema.methods.comparePassword = function (
  this: UserDocument,
  plainText: string
) {
  return bcrypt.compare(plainText, this.password);
};

export const UserModel = model<UserDocument, Model<UserDocument>>(
  "User",
  UserSchema
);
