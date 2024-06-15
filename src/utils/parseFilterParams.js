const parseIsFavourite = (isFavourite) => {
  const isBoolean = typeof isFavourite === 'boolean';
  if (!isBoolean) return;
};

const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const parsedContactType = contactType.toLowerCase();
  if (!['work', 'personal', 'home'].includes(parsedContactType)) {
    return;
  }
  return parsedContactType;
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;
  const parsedIsFavourite = parseIsFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);
  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
};