import { Router } from "express";

import createSemester from "./semesters/create-semester";
import deleteSemester from "./semesters/delete-semester";
import getSemesters from "./semesters/get-semesters";
import updateSemester from "./semesters/update-semester";

const route = Router();

route.use(createSemester);
route.use(deleteSemester);
route.use(getSemesters);
route.use(updateSemester);

export default route;
