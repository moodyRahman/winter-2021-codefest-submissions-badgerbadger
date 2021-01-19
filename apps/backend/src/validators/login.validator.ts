import Joi from "joi";

import { LoginDto } from "@shared/dtos/login.dto";

export const validate = (payload: any): LoginDto => {
  // prettier-ignore
  const schema = Joi.object<LoginDto>({
    password: Joi
      .string()
      .required(),

    username: Joi
      .string()
      .lowercase()
      .required(),
  });

  return schema.validate(payload).value;
};
