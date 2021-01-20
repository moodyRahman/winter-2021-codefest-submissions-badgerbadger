import { Router } from "express";

import login from "./auth/login";
import refreshToken from "./auth/refresh-token";
import register from "./auth/register";

const route = Router();

route.use(login);
route.use(refreshToken);
route.use(register);

export default route;
