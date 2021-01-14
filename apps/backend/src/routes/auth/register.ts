import createError from "http-errors";

import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { UserModel } from "../../schemas/user.schema";

import handler from "../../utils/handler";

import { validate } from "../../validators/register.validator";

const route = Router();

route.post(
  "/register",
  handler(async (req) => {
    const { password, username } = await validate(req.body);

    if (await UserModel.exists({ username })) {
      throw new createError.Conflict("Username already exists!");
    }

    const user = await UserModel.create({ password, username });

    return {
      status: StatusCodes.OK,
      user: {
        // TODO: hide password field from mongoose doc
        username: user.username,
      },
    };
  })
);

export default route;
