"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassModel = void 0;
const mongoose_1 = require("mongoose");
const omit_1 = require("../utils/omit");
const ClassSchema = new mongoose_1.Schema({
    fulfills: {
        required: true,
        type: [String],
    },
    name: {
        required: true,
        type: String,
    },
    prereqs: {
        default: () => [],
        ref: "Class",
        type: [mongoose_1.Schema.Types.ObjectId],
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
exports.ClassModel = mongoose_1.model("Class", ClassSchema);
