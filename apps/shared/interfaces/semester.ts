import { Class } from "./class";
import { User } from "./user";

export interface Semester {
  classes: Class[];
  createdAt: Date;
  id: string;
  name: string;
  user: User;
  updatedAt: Date;
}
