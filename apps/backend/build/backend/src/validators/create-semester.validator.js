"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
const validate = (payload) => {
    const schema = joi_1.default.object({
        classes: joi_1.default.array().items(joi_1.default.string()).max(30).default([]),
        name: joi_1.default.string().required(),
    });
    return schema.validateAsync(payload);
};
exports.validate = validate;
