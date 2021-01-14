import Joi from "joi";

export interface RegisterDto {
  password: string;
  username: string;
}

export const validate = (payload: any): Promise<RegisterDto> =>
  Joi.object<RegisterDto>({
    password: Joi.string().min(7).required(),
    username: Joi.string().alphanum().min(4).max(32).required(),
  })
    .validateAsync(payload)
    .then(() => payload);
