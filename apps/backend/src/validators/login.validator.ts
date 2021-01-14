import Joi from "joi";

import { LoginDto } from "@shared/dtos/login.dto";

export const validate = (payload: any): Promise<LoginDto> =>
  Joi.object<LoginDto>({
    password: Joi.string().required(),
    username: Joi.string().required(),
  })
    .validateAsync(payload)
    .then(() => payload);
