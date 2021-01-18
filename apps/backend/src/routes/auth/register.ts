import createError from "http-errors";

import { Router } from "express";

import { UserModel } from "../../models/user.model";

import { handler } from "../../utils/handler";
import { omit } from "../../utils/omit";

import { validate } from "../../validators/register.validator";

const route = Router();

route.post(
  "/register",
  handler(async (req) => {
    const { password, username } = await validate(req.body);

    const exist = await UserModel.exists({
      username: username.toLowerCase(),
    });

    if (exist) {
      throw new createError.Conflict("Username already exists!");
    }

    const user = await new UserModel({ password, username }).save();

    return {
      user: omit(user.toObject(), ["password"]),
    };
  })
);

export default route;
