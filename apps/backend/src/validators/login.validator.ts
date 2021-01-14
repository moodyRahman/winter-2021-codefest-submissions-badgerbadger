import Joi from "joi";

import { LoginDto } from "@shared/dtos/login.dto";

export const validate = (payload: any): Promise<LoginDto> => {
  const schema = Joi.object<LoginDto>({
    password: Joi.string().required(),
    username: Joi.string().lowercase().required(),
  });

  return schema.validateAsync(payload);
};
