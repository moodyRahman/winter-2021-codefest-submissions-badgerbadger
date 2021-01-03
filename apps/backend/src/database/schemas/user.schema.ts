import { Schema, Document } from "mongoose";
import { model } from "mongoose"

export interface IUser extends Document {
	username: string;
	hashed_password: string;
}


export const UserSchema: Schema = new Schema({
	username: String,
	hashed_password: String
});


export const User = model<IUser>('User', UserSchema);
