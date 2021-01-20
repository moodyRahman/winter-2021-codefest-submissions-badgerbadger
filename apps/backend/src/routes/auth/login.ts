import createError from "http-errors";
import jwt from "jsonwebtoken";

import { Router } from "express";

import config from "../../config";

import { UserModel } from "../../models/user.model";

import { handler } from "../../utils/handler";

import { validate } from "../../validators/login.validator";

const { accessToken, refreshToken } = config.get("jwt");

const route = Router();

route.post(
  "/login",
  handler(async (req) => {
    const { password, username } = await validate(req.body);

    const user = await UserModel.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      throw new createError.Unauthorized("Invalid login credentials");
    }

    return {
      accessToken: jwt.sign({ user: user.id }, accessToken.secret, {
        algorithm: "HS512", // Do we really need sha 512?
        expiresIn: accessToken.expiresIn
      }),
      refreshToken: jwt.sign({ user: user.id }, refreshToken.secret, {
        algorithm: "HS512",
        expiresIn: refreshToken.expiresIn
      })
    };
  })
);

export default route;
