import { Router } from "express";

import { SemesterDocument, SemesterModel } from "../../models/semester.model";

import { handler } from "../../utils/handler";

const route = Router();

route.get(
  "/",
  handler(async (req) => {
    // TODO: Ideally it should return a paginated set of semesters since there is no limit on how much semesters a user can create
    // prettier-ignore
    const semesters: SemesterDocument[] = await SemesterModel
      .find({ user: req.user.id, })
      .populate("classes")
      .populate("user");

    return {
      semesters
    };
  })
);

export default route;
