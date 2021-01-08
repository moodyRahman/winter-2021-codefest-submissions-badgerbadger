import bcrypt from "bcrypt";

import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  password: string;
  username: string;

  comparePassword(plainText: string): Promise<boolean>;
}

export const UserSchema: Schema = new Schema({
  password: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
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

export const User = mongoose.model<IUser>("User", UserSchema);
