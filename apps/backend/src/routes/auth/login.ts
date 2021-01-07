import { Router } from "express";

import { User, IUser } from "../../database/models";

import jwt from "jsonwebtoken";
// TODO: fix the relative import, @shared/enums/httpcodes does not work
import { HTTP_CODE } from "@shared/enums/httpcodes";

const route = Router();

route.post("/login", (req, res) => {
  User.find({ username: req.body.username }, (err, docs) => {
    if (docs.length == 0) {
      // it could be !doc.length, but isn't this so much readable?
      return res.send({
        status: HTTP_CODE.NOT_FOUND,
        message: "user was not found",
      });
    }

    // TODO: implement hash calculation
    if (req.body.password != docs[0].password) {
      return res.send({ status: HTTP_CODE.FORBIDDEN, message: "bad password" });
    }

    // TODO: calculate JWT and return here
    res.send({
      status: HTTP_CODE.OK,
      token: jwt.sign(
        { username: docs[0].username },
        "secret", // TODO: MAKE THIS AN ACTUAL SECRET LATER
        { algorithm: "HS512", expiresIn: "1h" }
      ),
    });
  });
});

export default route;
