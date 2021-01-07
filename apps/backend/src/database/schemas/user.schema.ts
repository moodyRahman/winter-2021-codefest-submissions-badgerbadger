import bcrypt from "bcrypt";

import { Schema, Document } from "mongoose";
import { model } from "mongoose";

export interface IUser extends Document {
  password: string;
  username: string;

  comparePassword(plainText: string): Promise<boolean>;
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

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.BCRYPT_COST) || 12
    );

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = function (this: IUser, plainText: string) {
  return bcrypt.compare(plainText, this.password);
};

export const User = model<IUser>("User", UserSchema);
