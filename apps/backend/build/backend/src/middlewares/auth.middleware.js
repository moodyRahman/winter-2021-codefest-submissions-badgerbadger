"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../models/user.model");
const INVALID_AUTH_TYPE = new http_errors_1.default.Forbidden("Invalid authentication type!"); // prettier-ignore
const INVALID_JWT_ERROR = new http_errors_1.default.Unauthorized("Invalid JWT token!");
exports.default = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        return next(INVALID_JWT_ERROR);
    }
    const [type, credentials] = authorization.split(" ");
    if (type !== "Bearer") {
        return next(INVALID_AUTH_TYPE);
    }
    try {
        const payload = (yield jsonwebtoken_1.default.verify(credentials, config_1.default.get("jwt_secret")));
        const user = yield user_model_1.UserModel.findOne({ id: payload.user });
        if (!user) {
            return next(INVALID_JWT_ERROR);
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error instanceof jsonwebtoken_1.JsonWebTokenError ? INVALID_JWT_ERROR : error);
    }
});
