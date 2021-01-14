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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = require("express");
const user_model_1 = require("../../models/user.model");
const handler_1 = require("../../utils/handler");
const omit_1 = require("../../utils/omit");
const register_validator_1 = require("../../validators/register.validator");
const route = express_1.Router();
route.post("/register", handler_1.handler((req) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, username } = yield register_validator_1.validate(req.body);
    const exist = yield user_model_1.UserModel.exists({
        username: username.toLowerCase(),
    });
    if (exist) {
        throw new http_errors_1.default.Conflict("Username already exists!");
    }
    const user = yield new user_model_1.UserModel({ password, username }).save();
    return {
        user: omit_1.omit(user.toObject(), ["password"]),
    };
})));
exports.default = route;
