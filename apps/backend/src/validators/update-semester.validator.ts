import Joi from "joi";

import { CreateSemesterDto } from "@shared/dtos/create-semester.dto";

export const validate = (payload: any): Promise<Partial<CreateSemesterDto>> => {
  const schema = Joi.object<Partial<CreateSemesterDto>>({
    classes: Joi.array().items(Joi.string()).max(30),
    name: Joi.string(),
  });

  return schema.validateAsync(payload);
};
