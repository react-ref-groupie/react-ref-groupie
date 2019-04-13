import {
  useEffect,
  useContext,
  useRef
} from 'react';

import { RefGroupContext } from './provider';
import initRefGroups from './init-ref-groups';
import { clearRefByMark } from './helpers';

const useRefGroups = (obj) => {
  const {
    refGroups: {
      refGroupsMethods,
      internalRefs
    },
    updateRefGroups
  } = useContext(RefGroupContext);

  const self = useRef();

  useEffect(
    () => {
      self.current = self.current || {
        mark: Math.random(),
        memoized: {}
      };
      self.current.refGroups = initRefGroups(
        self.current,
        internalRefs,
        obj,
        updateRefGroups
      );

      return () => {
        const {
          current: {
            memoized
          }
        } = self;

        let shouldUpdate = false;
        for (let groupName in memoized) {
          for (let refName in memoized[groupName]) {
            const internalRef = memoized[groupName][refName];
            clearRefByMark(internalRef, self.current.mark);
            shouldUpdate = true;
          }
        }

        if (shouldUpdate) {
          updateRefGroups();
        }
      };
    },
    []
  );

  let refGroups;
  if (!self.current) {
    refGroups = Object.keys(obj).reduce((accum, key) => {
      accum[key] = {};
      return accum;
    }, {});
  } else {
    refGroups = self.current.refGroups;
  }

  return [
    refGroups,
    refGroupsMethods
  ];
}

export default useRefGroups;
