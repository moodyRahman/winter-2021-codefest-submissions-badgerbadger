import { NextFunction, Request, Response } from "express";

import createError from "http-errors";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

import config from "../config";

import { JWTPayload } from "../interfaces/jwt-payload.interface";

import { UserModel } from "../models/user.model";

const INVALID_AUTH_TYPE = new createError.Forbidden("Invalid authentication type!"); // prettier-ignore
const INVALID_JWT_ERROR = new createError.Unauthorized("Invalid JWT token!");

export default async (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(INVALID_JWT_ERROR);
  }

  const [type, credentials] = authorization.split(" ");

  if (type !== "Bearer") {
    return next(INVALID_AUTH_TYPE);
  }

  try {
    const payload = (await jwt.verify(
      credentials,
      config.get("jwt_secret")
    )) as JWTPayload;

    const user = await UserModel.findOne({ id: payload.user });

    if (!user) {
      return next(INVALID_JWT_ERROR);
    }

    req.user = user;

    next();
  } catch (error: unknown) {
    next(error instanceof JsonWebTokenError ? INVALID_JWT_ERROR : error);
  }
};
