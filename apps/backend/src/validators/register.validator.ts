import Joi from "joi";

import { RegisterDto } from "@shared/dtos/register.dto";

export const validate = (payload: any): RegisterDto => {
  // prettier-ignore
  const schema = Joi.object<RegisterDto>({
    password: Joi
      .string()
      .min(7)
      .required(),

    username: Joi
      .string()
      .alphanum()
      .min(4)
      .max(32)
      .required(),
  });

  return schema.validate(payload).value;
};
