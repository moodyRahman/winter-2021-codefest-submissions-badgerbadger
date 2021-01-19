import createError from "http-errors";

import { Router } from "express";
import { Types } from "mongoose";

import { SemesterModel } from "../../models/semester.model";

import { handler } from "../../utils/handler";

const route = Router();

route.delete(
  "/:id",
  handler(async (req) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      throw new createError.BadRequest("Invalid semester ID!");
    }

    const deleted = await SemesterModel.findOneAndDelete({
      _id: id,
      user: req.user.id
    });

    if (!deleted) {
      throw new createError.BadRequest(`Semester '${id}' does not exist!`);
    }

    return {
      deleted
    };
  })
);

export default route;
