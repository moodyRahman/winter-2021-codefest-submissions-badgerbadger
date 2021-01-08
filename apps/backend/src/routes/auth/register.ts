import createError from "http-errors";

import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { User } from "../../database/models";

import handler from "../../utils/handler";

const route = Router();

route.post(
  "/register",
  handler((req) => {
    const { password, username } = req.body;

    if (!password) {
      throw new createError.BadRequest("You must input your password!");
    }

    if (!username) {
      throw new createError.BadRequest("You must input your username!");
    }
  }),
  handler(async (req) => {
    const { password, username } = req.body;

    if (await User.exists({ username })) {
      throw new createError.Conflict("Username already exists!");
    }

    const user = await new User({ password, username }).save();

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
