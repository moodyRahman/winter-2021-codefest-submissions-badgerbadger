import Joi from "joi";

import { CreateSemesterDto } from "@shared/dtos/create-semester.dto";

import objectId from "../utils/joi-object-id";

export const validate = (
  payload: unknown
): Promise<Partial<CreateSemesterDto>> => {
  // prettier-ignore
  const schema = Joi.object<Partial<CreateSemesterDto>>({
    classes: Joi
      .array()
      .items(Joi.string().custom(objectId))
      .max(30),

    name: Joi.string()
  });

  return schema.validateAsync(payload);
};
