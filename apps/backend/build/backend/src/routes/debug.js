"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const route = express_1.Router();
route.post("/debug", (_req, res) => {
    // console.log(_req.body);
    const newuser = new user_model_1.UserModel(_req.body);
    newuser.save((err, newuser) => {
        if (err) {
            return console.log(err);
        }
    });
    res.send(_req.body);
});
route.get("/debug", (_req, res) => {
    user_model_1.UserModel.find({}, (err, docs) => {
        // console.log(docs);
        res.send(docs);
    });
});
exports.default = route;
