import createError from "http-errors";

import { NextFunction, Request, RequestHandler, Response } from "express";
import { Types } from "mongoose";

import { handler } from "../utils/handler";

export default (path: keyof Request["params"]): RequestHandler => {
  return handler((req: Request, _res: Response, next: NextFunction) => {
    const value = req.params[path];

    if (!Types.ObjectId.isValid(value)) {
      throw new createError.BadRequest("Invalid ID provided!");
    }

    next();
  });
};
