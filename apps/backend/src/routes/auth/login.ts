import createError from "http-errors";
import jwt from "jsonwebtoken";

import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import config from "../../config";

import { UserDocument, UserModel } from "../../schemas/user.schema";

import { handler } from "../../utils/handler";

import { validate } from "../../validators/login.validator";

const route = Router();

route.post(
  "/login",
  handler(async (req) => {
    const { password, username } = await validate(req.body);

    const user: UserDocument = await UserModel.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      throw new createError.Unauthorized("Invalid login credentials");
    }

    return {
      status: StatusCodes.OK,
      token: jwt.sign({ username: user.username }, config.get("jwt_secret"), {
        algorithm: "HS512",
        expiresIn: "1h",
      }),
    };
  })
);

export default route;
