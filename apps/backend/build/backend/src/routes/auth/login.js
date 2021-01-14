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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../../models/user.model");
const handler_1 = require("../../utils/handler");
const login_validator_1 = require("../../validators/login.validator");
const route = express_1.Router();
route.post("/login", handler_1.handler((req) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, username } = yield login_validator_1.validate(req.body);
    const user = yield user_model_1.UserModel.findOne({ username });
    if (!user || !(yield user.comparePassword(password))) {
        throw new http_errors_1.default.Unauthorized("Invalid login credentials");
    }
    return {
        accessToken: jsonwebtoken_1.default.sign({ user: user.id }, config_1.default.get("jwt_secret"), {
            algorithm: "HS512",
            expiresIn: "1h",
        }),
    };
})));
exports.default = route;
