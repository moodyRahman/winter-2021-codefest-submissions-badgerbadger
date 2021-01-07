import { Router } from "express";
import { User, IUser } from "../../database/models";
import { HTTP_CODE } from "@shared/enums/httpcodes";

const route = Router();

route.post("/register", (req, res) => {
  // since User.find is one line of code, the body entirely consists of callbacks,
  User.find({ username: req.body.username }, (err, docs) => {
    if (err) {
      console.log(err);
      return res.send({
        status: HTTP_CODE.INTERNAL_ERROR,
        message: "internal error",
      });
    }

    // if the user does exist, return error
    if (docs.length != 0) {
      return res.send({
        status: HTTP_CODE.FORBIDDEN,
        message: "user already exists",
      });
    }

    new User({
      username: req.body.username,
      password: req.body.password,
    }).save((err, newuser) => {
      if (err) {
        console.log(err);
        return res.send({
          status: HTTP_CODE.INTERNAL_ERROR,
          message: "internal error",
        });
      }
    });

    return res.send({ status: HTTP_CODE.OK, message: "user created!" });
  });
});

export default route;
