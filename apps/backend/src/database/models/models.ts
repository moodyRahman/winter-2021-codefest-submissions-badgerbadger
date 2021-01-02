import UserSchema from "./user/user.schema"
import {model} from "mongoose"

export const User = model('User', UserSchema);