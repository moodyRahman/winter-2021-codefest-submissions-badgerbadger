import { Router } from "express";
// import { UserDocument, UserModel } from "../models/user.model";

const route = Router();

route.post("/debug", (_req, res) => {
  // console.log(_req.body);
  // const newuser = new UserModel(_req.body);
  // newuser.save((err, newuser) => {
  //   if (err) {
  //     return console.log(err);
  //   }
  // });
  // res.send(_req.body);
});

route.get("/debug", (_req, res) => {
  // UserModel.find({}, (err, docs) => {
  //   // console.log(docs);
  //   res.send(docs);
  // });
});

export default route;
