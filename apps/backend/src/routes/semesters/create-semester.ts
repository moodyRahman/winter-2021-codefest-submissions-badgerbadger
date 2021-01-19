import createError from "http-errors";

import { Router } from "express";
import { Types } from "mongoose";

import { ClassDocument, ClassModel } from "../../models/class.model";
import { SemesterDocument, SemesterModel } from "../../models/semester.model";

import { handler } from "../../utils/handler";

import { validate } from "../../validators/create-semester.validator";

const route = Router();

route.post(
  "/",
  handler(async (req) => {
    const { classes: classIds, name } = validate(req.body);

    for (const classId of classIds) {
      if (!Types.ObjectId.isValid(classId)) {
        throw new createError.BadRequest("Invalid class ID!");
      }
    }

    if (await SemesterModel.exists({ name, user: req.user.id })) {
      throw new createError.Conflict(`Semester '${name}' already exist!`);
    }

    const classes = await ClassModel.find({ _id: { $in: classIds } });

    const semester = new SemesterModel();

    semester.classes.addToSet(classes.map((c) => c._id));
    semester.name = name;
    semester.user = req.user.id;

    await semester.save();

    return {
      semester
    };
  })
);

export default route;
