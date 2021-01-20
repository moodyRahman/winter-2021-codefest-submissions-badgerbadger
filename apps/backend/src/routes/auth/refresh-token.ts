import createError from "http-errors";
import jwt from "jsonwebtoken";

import { Router } from "express";

import config from "../../config";

import { JWTPayload } from "../../interfaces/jwt-payload.interface";

import { UserModel } from "../../models/user.model";

import { handler } from "../../utils/handler";

import { validate } from "../../validators/refresh-token.validator";

const { accessToken, refreshToken } = config.get("jwt");

const route = Router();

const INVALID_REFRESH_TOKEN_ERROR = new createError.Unauthorized(
  "Invalid refresh token!"
);

route.post(
  "/refresh-token",
  handler(async (req) => {
    const credentials = await validate(req.body);

    let payload = null;

    try {
      payload = jwt.verify(
        credentials.refreshToken,
        refreshToken.secret
      ) as JWTPayload;
    } catch (error) {
      throw INVALID_REFRESH_TOKEN_ERROR;
    }

    const user = await UserModel.findOne({ _id: payload.user });

    if (!user) {
      throw INVALID_REFRESH_TOKEN_ERROR;
    }

    return {
      accessToken: jwt.sign({ user: user.id }, accessToken.secret, {
        algorithm: "HS512",
        expiresIn: accessToken.expiresIn
      })
    };
  })
);

export default route;
