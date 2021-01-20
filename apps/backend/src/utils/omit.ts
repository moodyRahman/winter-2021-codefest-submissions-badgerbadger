// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omit = <T extends Record<string, any>>(
  obj: T,
  fields: (keyof T)[]
): Partial<T> => {
  const returnObject = Object.assign({}, obj);

  for (const field of fields) {
    delete returnObject[field];
  }

  return returnObject;
};
