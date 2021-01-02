import { Schema } from "mongoose";

const UserSchema = new Schema({
	username: String,
	hashed_password: String
});

export default UserSchema;