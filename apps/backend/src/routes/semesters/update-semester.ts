import { Router } from "express";

import { handler } from "../../utils/handler";

const route = Router();

route.patch(
  "/:id",
  handler(async (req) => {})
);

export default route;
