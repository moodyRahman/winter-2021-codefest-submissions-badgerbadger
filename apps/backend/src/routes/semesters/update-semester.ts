import createError from "http-errors";

import { Router } from "express";
import { Types } from "mongoose";

import { ClassModel } from "../../models/class.model";
import { SemesterDocument, SemesterModel } from "../../models/semester.model";

import { handler } from "../../utils/handler";

import { validate } from "../../validators/update-semester.validator";

const route = Router();

route.patch(
  "/:id",
  handler(async (req) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      throw new createError.BadRequest("Invalid semester ID!");
    }

    const { classes, name } = validate(req.body);

    const semester = await SemesterModel.findOne({
      _id: id,
      user: req.user.id
    });

    if (!semester) {
      throw new createError.BadRequest(`Semester '${id}' does not exist!`);
    }

    if (classes) {
      for (const classId of classes) {
        if (!Types.ObjectId.isValid(classId)) {
          throw new createError.BadRequest(
            `Class '${classId}' does not exist!`
          );
        }
      }

      const count = await ClassModel.count({ _id: { $in: classes } });

      if (count !== classes.length) {
        throw new createError.BadRequest("One or more classes do not exist!");
      }

      semester.classes.addToSet(...classes);
    }

    if (name && name !== semester.name) {
      semester.name = name;
    }

    await semester.save();

    return {
      updated: semester
    };
  })
);

export default route;
