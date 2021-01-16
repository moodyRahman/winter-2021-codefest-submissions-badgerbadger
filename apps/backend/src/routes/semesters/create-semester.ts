import { Router } from "express";

import { handler } from "../../utils/handler";

import { validate } from "../../validators/create-semester.validator";

const route = Router();

route.post(
  "/",
  handler(async (req) => {})
);

export default route;
