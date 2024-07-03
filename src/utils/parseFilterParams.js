const parseType = (type) => {
  const isString = typeof type === 'string';

  if (!isString) return;

  const isType = ['work', 'home', 'personal'].includes(type);

  if (isType) return type;
};

const parseIsFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';

  if (!isString) return;

  const isBoolean = ['true', 'false'].includes(isFavourite);

  if (isBoolean) return isFavourite;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};