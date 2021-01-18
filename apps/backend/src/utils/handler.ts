import { HttpError } from "http-errors";
import { NextFunction, RequestHandler } from "express";
import { ValidationError } from "joi";

export type HandlerFunction<T> = (...args: Parameters<RequestHandler>) => T;

export const handler = <T>(handlerFn: HandlerFunction<T>) => async (
  ...args: Parameters<RequestHandler>
) => {
  const [req, res, next] = args;

  let nextCalled = false;

  const proxyNext = (...args: Parameters<NextFunction>) => {
    nextCalled = true;
    next(...args);
  };

  try {
    const body = await handlerFn(req, res, proxyNext);

    if (!nextCalled && !res.headersSent) {
      res.send({
        status: res.statusCode,
        data: body,
      });
    }
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      if (error.expose) {
        res.status(error.status).send({
          error: error.name,
          message: error.message,
          status: error.status,
        });
      } else {
        res.status(error.status).send({
          error: error.name,
          status: error.status,
        });

        next(error);
      }
    } else if (error instanceof ValidationError) {
      res.send({
        error: error.name,
        details: error.details,
        status: 400,
      });
    } else {
      next(error);
    }
  }
};
