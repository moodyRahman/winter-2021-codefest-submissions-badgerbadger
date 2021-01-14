import createError from "http-errors";
import jwt from "jsonwebtoken";

import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { UserDocument, UserModel } from "../../schemas/user.schema";

import handler from "../../utils/handler";

const route = Router();

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment");
}

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

    const user: UserDocument = await UserModel.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      throw new createError.Unauthorized("Invalid login credentials");
    }

    return {
      status: StatusCodes.OK,
      token: jwt.sign({ username: user.username }, JWT_SECRET, {
        algorithm: "HS512",
        expiresIn: "1h",
      }),
    };
  })
);

export default route;
