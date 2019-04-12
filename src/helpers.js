import { createRef } from 'react';

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
};

export const clearRefByMark = (internalRef, mark) => {
  internalRef.ref = createRef();
  const index = internalRef.lockedOn.indexOf(mark);
  internalRef.lockedOn.splice(index, 1);
};

export const noSuchConfigError = (groupName) => {
  console.error(`You've tried to access config which does not exist [${groupName}]`);
};

export const noSuchRefError = (groupName, refName) => {
  console.error(`There is no such ref [${refName}] in group [${groupName}]`);
};

export const logNameCollisionError = (groupName, refName) => {
  console.error(`Ref group [${groupName}] have naming collision on ` +
    `name [${refName}], check your config`);
};

export const logRefUsageError = (groupName) => {
  console.error(`Check your refs usage in group "${groupName}"`
    + ' - each ref should be used once at a time.');
};
