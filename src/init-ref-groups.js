import { splitTemplate } from './helpers';

const initRefGroups = (
  self,
  blockGroups,
  internalRefs,
  obj
) => {
  const mockObject = {};
  const keepRefs = {};
  let result;

  try {
    result = Object.keys(obj).reduce(
      (accum, groupName) => {
        accum[groupName] = {};
        mockObject[groupName] = {};
        keepRefs[groupName] = {};
        self.memoized[groupName] = self.memoized[groupName] || {};

        if (!internalRefs[groupName]) {
          // TODO: add warning if there is no such group
          return accum;
        }

        const refNames = splitTemplate(obj[groupName]);
        refNames.forEach((refName) => {
          if (self.memoized[groupName][refName]) {
            accum[groupName][refName] = self.memoized[groupName][refName].ref;
          } else {
            const refGroup = internalRefs[groupName];

            if (!refGroup[refName]) {
              // TODO: add warning that there is no such ref in config
              return accum;
            } else if (refGroup[refName].locked) {
              if (!self.invalid) {
                blockGroups(obj, self.mark);
              }
              self.invalid = true;
              throw new Error();
            }

            accum[groupName][refName] = refGroup[refName].ref;
            self.memoized[groupName][refName] = refGroup[refName];
            refGroup[refName].locked = true;
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
      if (keepRefs[groupName][refName]) {
        break;
      }

      self.memoized[groupName][refName].locked = false;
      delete self.memoized[groupName][refName];
    }
  }

  return result;
};

export default initRefGroups;
