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
exports.UserModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
const omit_1 = require("../utils/omit");
const UserSchema = new mongoose_1.Schema({
    displayName: {
        minlength: 4,
        maxlength: 32,
        type: String,
        unique: true,
        validate: /^[a-z0-9]+$/i,
    },
    password: {
        required: true,
        type: String,
    },
    username: {
        minlength: 4,
        maxlength: 32,
        required: true,
        type: String,
        unique: true,
        validate: /^[a-z0-9]+$/i,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (_doc, ret) => omit_1.omit(ret, ["_id", "__v"]),
        virtuals: true,
    },
    toObject: {
        transform: (_doc, ret) => omit_1.omit(ret, ["_id", "__v"]),
        virtuals: true,
    },
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        try {
            this.password = yield bcrypt_1.default.hash(this.password, config_1.default.get("bcrypt_cost"));
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("username"))
            return next();
        this.displayName = this.username;
        this.username = this.username.toLowerCase();
        next();
    });
});
UserSchema.methods.comparePassword = function (plainText) {
    return bcrypt_1.default.compare(plainText, this.password);
};
exports.UserModel = mongoose_1.model("User", UserSchema);
