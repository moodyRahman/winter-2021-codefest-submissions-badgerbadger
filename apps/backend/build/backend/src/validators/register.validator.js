"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
const validate = (payload) => {
    const schema = joi_1.default.object({
        password: joi_1.default.string().min(7).required(),
        username: joi_1.default.string().alphanum().min(4).max(32).required(),
    });
    return schema.validateAsync(payload);
};
exports.validate = validate;
