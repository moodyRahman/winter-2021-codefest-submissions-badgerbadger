import createError from "http-errors";

import { Router } from "express";

import validateObjectId from "../../middlewares/validate-object-id.middleware";

import { SemesterModel } from "../../models/semester.model";

import { handler } from "../../utils/handler";

const route = Router();

route.delete(
  "/:id",
  validateObjectId("id"),
  handler(async (req) => {
    const { id } = req.params;

    // prettier-ignore
    const deleted = await SemesterModel
      .findOneAndDelete({
        _id: id,
        user: req.user.id
      })
      .populate("classes")
      .populate("user");

    if (!deleted) {
      throw new createError.BadRequest(`Semester '${id}' does not exist!`);
    }

    return {
      deleted
    };
  })
);

export default route;
