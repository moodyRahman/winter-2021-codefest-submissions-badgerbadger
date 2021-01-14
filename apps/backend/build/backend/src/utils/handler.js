"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const http_errors_1 = require("http-errors");
const joi_1 = require("joi");
const handler = (handlerFn) => (...args) => __awaiter(void 0, void 0, void 0, function* () {
    const [req, res, next] = args;
    let nextCalled = false;
    const proxyNext = (...args) => {
        nextCalled = true;
        next(...args);
    };
    try {
        const body = yield handlerFn(req, res, proxyNext);
        if (!nextCalled && !res.headersSent) {
            res.send({
                status: res.statusCode,
                data: body,
            });
        }
    }
    catch (error) {
        if (error instanceof http_errors_1.HttpError) {
            if (error.expose) {
                res.status(error.status).send({
                    error: error.name,
                    message: error.message,
                    status: error.status,
                });
            }
            else {
                res.status(error.status).send({
                    error: error.name,
                    status: error.status,
                });
                next(error);
            }
        }
        else if (error instanceof joi_1.ValidationError) {
            res.send({
                error: error.name,
                details: error.details,
                status: 400,
            });
        }
        else {
            next(error);
        }
    }
});
exports.handler = handler;
