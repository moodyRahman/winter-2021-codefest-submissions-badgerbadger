import Joi from "joi";

import { RefreshTokenDto } from "@shared/dtos/refresh-token.dto";

export const validate = (payload: unknown): Promise<RefreshTokenDto> => {
  const schema = Joi.object<RefreshTokenDto>({
    refreshToken: Joi.string().required()
  });

  return schema.validateAsync(payload);
};
