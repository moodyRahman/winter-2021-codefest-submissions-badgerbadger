import bcrypt from "bcrypt";

import { Document, Schema, model } from "mongoose";

import config from "../config";

import { omit } from "../utils/omit";

// TODO: dtos should use UserDocument interface for single source of truth
export interface UserDocument extends Document {
  displayName: string;
  password: string;
  username: string;

  comparePassword(plainText: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>(
  {
    displayName: {
      minlength: 4,
      maxlength: 32,
      type: String,
      unique: true,
      validate: /^[a-z0-9]+$/i
    },
    password: {
      required: true,
      type: String
    },
    username: {
      minlength: 4,
      maxlength: 32,
      required: true,
      type: String,
      unique: true,
      validate: /^[a-z0-9]+$/i
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        return omit<UserDocument>(ret, ["_id", "__v", "password"]);
      },
      virtuals: true
    },
    toObject: {
      transform: (_doc, ret) => {
        return omit<UserDocument>(ret, ["_id", "__v", "password"]);
      },
      virtuals: true
    }
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

export const UserModel = model<UserDocument>("User", UserSchema);
