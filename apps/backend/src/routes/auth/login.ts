import createError from "http-errors";

import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { User, IUser } from "../../database/models";

import handler from "../../utils/handler";

import jwt from "jsonwebtoken";

const route = Router();

route.post(
  "/login",
  handler((req) => {
    const { password, username } = req.body;

    if (!password) {
      throw new createError.BadRequest("You must input your password!");
    }

    if (!username) {
      throw new createError.BadRequest("You must input your password!");
    }
  }),
  handler(async (req) => {
    const { password, username } = req.body;

    const user: IUser = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      throw new createError.Unauthorized("Invalid login credentials");
    }

    return {
      status: StatusCodes.OK,
      token: jwt.sign(
        { username: user.username },
        "secret", // TODO: MAKE THIS AN ACTUAL SECRET LATER
        { algorithm: "HS512", expiresIn: "1h" }
      ),
    };
  })
);

export default route;
