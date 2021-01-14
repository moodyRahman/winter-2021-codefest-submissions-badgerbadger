import Joi from "joi";

export interface LoginDto {
  password: string;
  username: string;
}

export const validate = (payload: any): Promise<LoginDto> =>
  Joi.object<LoginDto>({
    password: Joi.string().required(),
    username: Joi.string().required(),
  })
    .validateAsync(payload)
    .then(() => payload);
