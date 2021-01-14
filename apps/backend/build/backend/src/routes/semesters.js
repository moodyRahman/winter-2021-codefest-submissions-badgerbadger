"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_semester_1 = __importDefault(require("./semesters/create-semester"));
const delete_semester_1 = __importDefault(require("./semesters/delete-semester"));
const get_semesters_1 = __importDefault(require("./semesters/get-semesters"));
const update_semester_1 = __importDefault(require("./semesters/update-semester"));
const route = express_1.Router();
route.use(create_semester_1.default);
route.use(delete_semester_1.default);
route.use(get_semesters_1.default);
route.use(update_semester_1.default);
exports.default = route;
