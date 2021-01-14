import Joi from "joi";

import { CreateSemesterDto } from "@shared/dtos/create-semester.dto";

export const validate = (payload: any): Promise<CreateSemesterDto> => {
  const schema = Joi.object<CreateSemesterDto>({
    classes: Joi.array().items(Joi.string()).max(30).default([]),
    name: Joi.string().required(),
  });

  return schema.validateAsync(payload);
};
