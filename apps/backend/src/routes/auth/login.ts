import createError from "http-errors";
import jwt from "jsonwebtoken";

import { Router } from "express";

import config from "../../config";

import { UserDocument, UserModel } from "../../models/user.model";

import { handler } from "../../utils/handler";

import { validate } from "../../validators/login.validator";

const route = Router();

route.post(
  "/login",
  handler(async (req) => {
    const { password, username } = validate(req.body);

    const user: UserDocument | null = await UserModel.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      throw new createError.Unauthorized("Invalid login credentials");
    }

    return {
      accessToken: jwt.sign({ user: user.id }, config.get("jwt_secret"), {
        algorithm: "HS512",
        expiresIn: "1h"
      })
    };
  })
);

export default route;
