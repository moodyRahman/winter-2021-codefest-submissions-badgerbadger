"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = void 0;
const omit = (obj, fields) => {
    const returnObject = Object.assign({}, obj);
    for (const field of fields) {
        delete returnObject[field];
    }
    return returnObject;
};
exports.omit = omit;
