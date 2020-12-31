import { Router } from "express";

import login from "./auth/login";
import register from "./auth/register";

const route = Router();

route.use(login);
route.use(register);

export default route;
