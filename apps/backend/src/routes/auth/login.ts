import { Router } from "express";

import { dbconnect } from "../../database/database";

const route = Router();
dbconnect();

route.post("/login", (req, res) => {});

export default route;

