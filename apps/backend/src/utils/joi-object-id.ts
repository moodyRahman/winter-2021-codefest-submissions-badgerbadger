import { Types } from "mongoose";

export default (value: unknown): string => {
  if (typeof value !== "string" || !Types.ObjectId.isValid(value)) {
    throw new Error("an invalid ID was provided!");
  }

  return value;
};
