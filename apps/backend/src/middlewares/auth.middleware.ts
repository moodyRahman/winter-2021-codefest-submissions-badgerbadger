import { NextFunction, Request, Response } from "express";

import createError from "http-errors";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

import config from "../config";

import { JWTPayload } from "../interfaces/jwt-payload.interface";

import { UserModel } from "../models/user.model";

import { handler } from "../utils/handler";

const INVALID_AUTH_TYPE = new createError.Forbidden("Invalid authentication type!"); // prettier-ignore
const INVALID_JWT_ERROR = new createError.Unauthorized("Invalid JWT token!");

export default handler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw INVALID_JWT_ERROR;
    }

    const [type, credentials] = authorization.split(" ");

    if (type !== "Bearer") {
      throw INVALID_AUTH_TYPE;
    }

    try {
      const payload = (await jwt.verify(
        credentials,
        config.get("jwt_secret")
      )) as JWTPayload;

      const user = await UserModel.findOne({ _id: payload.user });

      if (!user) {
        throw INVALID_JWT_ERROR;
      }

      req.user = user;

      next();
    } catch (error: unknown) {
      if (error instanceof JsonWebTokenError) {
        throw INVALID_JWT_ERROR;
      }

      throw error;
    }
  }
);
