import { Router } from "express";

import { ClassModel } from "../models/class.model";

import { handler } from "../utils/handler";

const route = Router();

route.get(
  "/",
  handler(async () => {
    // TODO: Return a paginated set of classes with filter ability
    const classes = await ClassModel.find().populate("prereqs");

    return {
      classes
    };
  })
);

export default route;
