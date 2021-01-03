import { Schema, Document } from "mongoose";

export interface IUser extends Document {
	username: string;
	hashed_password: string;
	salt:string;
}


export const UserSchema: Schema = new Schema({
	username: String,
	hashed_password: String,
	salt:String
});
