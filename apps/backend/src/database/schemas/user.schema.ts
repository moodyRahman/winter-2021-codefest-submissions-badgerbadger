import bcrypt from "bcrypt";

import { Schema, Document } from "mongoose";
import { model } from "mongoose";

export interface IUser extends Document {
  password: string;
  username: string;
}

export const UserSchema: Schema = new Schema({
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

UserSchema.pre;

UserSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password, 12, (err, hash) => {
    if (err) return next(err);

    this.password = hash;

    next();
  });
});

export const User = model<IUser>("User", UserSchema);
