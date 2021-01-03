import {UserSchema, IUser} from "./user/user.schema"

import {model} from "mongoose"

export const User = model<IUser>('User', UserSchema);
export {IUser} from "./user/user.schema";