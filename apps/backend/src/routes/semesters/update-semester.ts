import createError from "http-errors";

import { Router } from "express";
import { Types } from "mongoose";

import validateObjectId from "../../middlewares/validate-object-id.middleware";

import { ClassDocument, ClassModel } from "../../models/class.model";
import { SemesterModel } from "../../models/semester.model";

import { handler } from "../../utils/handler";

import { validate } from "../../validators/update-semester.validator";

const route = Router();

route.patch(
  "/:id",
  validateObjectId("id"),
  handler(async (req) => {
    const { classes: classIds, name } = await validate(req.body);
    const { id } = req.params;

    const semester = await SemesterModel.findOne({
      _id: id,
      user: req.user.id
    });

    if (!semester) {
      throw new createError.BadRequest(`Semester '${id}' does not exist!`);
    }

    if (classIds && classIds.length > 0) {
      const classes = await ClassModel.find({ _id: { $in: classIds } });

      const ids = [
        ...new Set<Types.ObjectId>(classes.map((c: ClassDocument) => c._id))
      ];

      semester.set("classes", ids);
    } else {
      semester.set("classes", []);
    }

    if (name && name !== semester.name) {
      semester.name = name;
    }

    await semester.save();

    const updated = await semester
      .populate({ path: "classes", model: "Class" })
      .populate({ path: "user", model: "User" })
      .execPopulate();

    return {
      updated
    };
  })
);

export default route;
