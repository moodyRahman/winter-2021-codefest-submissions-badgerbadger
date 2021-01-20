import Joi from "joi";

import { CreateSemesterDto } from "@shared/dtos/create-semester.dto";

import objectId from "../utils/joi-object-id";

export const validate = (payload: unknown): Promise<CreateSemesterDto> => {
  // prettier-ignore
  const schema = Joi.object<CreateSemesterDto>({
    classes: Joi
      .array()
      .items(Joi.string().custom(objectId))
      .max(30)
      .default([]),

    name: Joi
      .string()
      .max(64)
      .required()
  });

  return schema.validateAsync(payload);
};
