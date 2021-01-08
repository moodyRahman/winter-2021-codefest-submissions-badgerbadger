import { HttpError } from "http-errors";
import { NextFunction, RequestHandler } from "express";

export type HandlerFunction = (...args: Parameters<RequestHandler>) => any;

export default (handler: HandlerFunction) => async (
  ...args: Parameters<RequestHandler>
) => {
  const [req, res, next] = args;

  let nextCalled = false;

  const proxyNext = (...args: Parameters<NextFunction>) => {
    nextCalled = true;
    next(...args);
  };

  try {
    const body = await handler(req, res, proxyNext);

    if (!body) {
      next();
    } else if (!nextCalled && !res.headersSent) {
      res.send(body);
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
    } else {
      next(error);
    }
  }
};
