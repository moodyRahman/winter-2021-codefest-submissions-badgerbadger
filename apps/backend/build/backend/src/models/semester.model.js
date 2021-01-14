"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterModel = void 0;
const mongoose_1 = require("mongoose");
const class_model_1 = require("./class.model");
const user_model_1 = require("./user.model");
const omit_1 = require("../utils/omit");
const SemesterSchema = new mongoose_1.Schema({
    classes: {
        default: () => [],
        ref: class_model_1.ClassModel,
        type: [mongoose_1.Schema.Types.ObjectId],
    },
    name: {
        required: true,
        type: String,
    },
    user: {
        ref: user_model_1.UserModel,
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.SemesterModel = mongoose_1.model("Semester", SemesterSchema);
