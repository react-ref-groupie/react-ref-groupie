import { createRef as reactCreateRef } from 'react';

export const splitTemplate = (str) =>
  str
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');

export const getRefsCurrent = (obj) => {
  const res = {};
  for (let key in obj) {
    res[key] = obj[key].ref.current;
  }
  return res;
}

export const createRef = () => ({
  ref: reactCreateRef(),
  locked: false
});

export const logNameCollisionError = (groupName, refName) => {
  console.error(`Ref group [${groupName}] have naming collision on ` +
    `name [${refName}], check your config`);
}

export const logRefUsageError = (refUsageErrors) => {
  const errorMessage = 'Check your ref usage - each ref should be used ones at a time:/n';

  refUsageErrors.forEach((refUsageError) => {
    errorMessage += 'group ['
      + refUsageError.group
      + '] - ref ['
      + refUsageError.ref
      + ']/n';
  });

  console.error(errorMessage);
}
