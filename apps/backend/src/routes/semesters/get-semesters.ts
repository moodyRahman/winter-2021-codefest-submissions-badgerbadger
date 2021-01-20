import { Router } from "express";

import { SemesterModel } from "../../models/semester.model";

import { handler } from "../../utils/handler";

const route = Router();

route.get(
  "/",
  handler(async (req) => {
    // TODO: Ideally it should return a paginated set of semesters since there is no limit on how much semesters a user can create
    const semesters = await SemesterModel.find({ user: req.user.id })
      .populate({ path: "classes", model: "Class" })
      .populate({ path: "user", model: "User" })
      .exec();

    return {
      semesters
    };
  })
);

export default route;
