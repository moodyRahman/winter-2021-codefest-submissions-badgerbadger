import UserSchema from "./user/user.schema"
import {model} from "mongoose"

const User = model('User', UserSchema);