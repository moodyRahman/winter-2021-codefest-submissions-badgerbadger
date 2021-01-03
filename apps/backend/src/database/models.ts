import {UserSchema, IUser} from "./schemas/user.schema"

import {model} from "mongoose"

export const User = model<IUser>('User', UserSchema);
export {IUser} from "./schemas/user.schema";
