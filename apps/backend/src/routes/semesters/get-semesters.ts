import { Router } from "express";

import { handler } from "../../utils/handler";

const route = Router();

route.get(
  "/",
  handler(async (req) => {})
);

export default route;
