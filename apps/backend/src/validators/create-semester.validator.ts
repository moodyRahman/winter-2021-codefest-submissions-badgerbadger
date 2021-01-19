import Joi from "joi";

import { CreateSemesterDto } from "@shared/dtos/create-semester.dto";

export const validate = (payload: any): CreateSemesterDto => {
  // prettier-ignore
  const schema = Joi.object<CreateSemesterDto>({
    classes: Joi
      .array()
      .items(Joi.string())
      .max(30)
      .default([]),

    name: Joi
      .string()
      .max(64)
      .required(),
  });

  return schema.validate(payload).value;
};
