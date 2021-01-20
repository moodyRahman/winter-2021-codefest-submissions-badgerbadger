import createError from "http-errors";

import { Router } from "express";

import { ClassDocument, ClassModel } from "../../models/class.model";
import { SemesterModel } from "../../models/semester.model";

import { handler } from "../../utils/handler";

import { validate } from "../../validators/create-semester.validator";

const route = Router();

route.post(
  "/",
  handler(async (req) => {
    const { classes: classIds, name } = await validate(req.body);

    if (await SemesterModel.exists({ name, user: req.user.id })) {
      throw new createError.Conflict(`Semester '${name}' already exist!`);
    }

    const classes = await ClassModel.find({ _id: { $in: classIds } });

    const semester = new SemesterModel();

    semester.classes.addToSet(...classes.map((c: ClassDocument) => c._id));
    semester.name = name;
    semester.user = req.user.id;

    await semester.save();

    const created = await semester
      .populate("classes")
      .populate("user")
      .execPopulate();

    return {
      created
    };
  })
);

export default route;
