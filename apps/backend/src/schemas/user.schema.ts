import bcrypt from "bcrypt";

import { Document, Schema, model } from "mongoose";

import config from "../config";

export interface User {
  password: string;
  username: string;
}

export interface UserDocument extends User, Document {
  comparePassword(plainText: string): Promise<boolean>;
}

const UserSchema = new Schema({
  password: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
});

UserSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, config.get("bcrypt_cost"));

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = function (this: User, plainText: string) {
  return bcrypt.compare(plainText, this.password);
};

export const UserModel = model<UserDocument>("User", UserSchema);
