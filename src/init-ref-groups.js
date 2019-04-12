import {
  splitTemplate,
  noSuchConfigError,
  noSuchRefError,
  clearRefByMark
} from './helpers';

const initRefGroups = (
  self,
  internalRefs,
  obj,
  updateRefGroups
) => {
  const mockObject = {};
  const keepRefs = {};
  let shouldNotUpdate = true;
  let result;

  try {
    result = Object.keys(obj).reduce(
      (accum, groupName) => {
        accum[groupName] = {};
        mockObject[groupName] = {};
        keepRefs[groupName] = {};
        self.memoized[groupName] = self.memoized[groupName] || {};

        if (!internalRefs[groupName]) {
          noSuchConfigError(groupName);
          return accum;
        }

        const refNames = splitTemplate(obj[groupName]);
        refNames.forEach((refName) => {
          if (self.memoized[groupName][refName]) {
            accum[groupName][refName] = self.memoized[groupName][refName].ref;
          } else {
            const refGroup = internalRefs[groupName];

            if (!refGroup[refName]) {
              noSuchRefError(groupName, refName);
              return accum;
            }

            accum[groupName][refName] = refGroup[refName].ref;
            self.memoized[groupName][refName] = refGroup[refName];
            refGroup[refName].lockedOn.push(self.mark);
            shouldNotUpdate = shouldNotUpdate && false;
          }

          keepRefs[groupName][refName] = true;
        });

        return accum;
      },
      {}
    );
  } catch (e) {
    return mockObject;
  }

  for (let groupName in self.memoized) {
    for (let refName in self.memoized[groupName]) {
      if (
        keepRefs[groupName]
        && keepRefs[groupName][refName]
      ) {
        break;
      }

      const internalRef = self.memoized[groupName][refName];
      clearRefByMark(internalRef, self.mark);
      delete self.memoized[groupName][refName];
    }
  }

  if (!shouldNotUpdate) {
    updateRefGroups();
  }

  return result;
};

export default initRefGroups;
