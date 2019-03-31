import {
  useState,
  useEffect,
  useContext,
  useRef
} from 'react';

import { RefGroupContext } from './provider';
import initRefGroups from './init-ref-groups';

const useRefGroups = (obj) => {
  const {
    refGroupsMethods,
    internalRefs,
    blockGroups,
    unblockGroups
  } = useContext(RefGroupContext);

  const [ready, setReady] = useState(false);
  const self = useRef();

  useEffect(
    () => {
      self.current = self.current || {
        mark: Math.random(),
        memoized: {}
      };
      self.current.refGroups = initRefGroups(
        self.current,
        blockGroups,
        internalRefs,
        obj
      );

      setReady(true);

      return () => {
        const {
          current: {
            mark,
            memoized,
            invalid
          }
        } = self;

        if (invalid) {
          unblockGroups(mark);
          return;
        }

        for (let groupName in memoized) {
          for (let refName in memoized[groupName]) {
            memoized[groupName][refName].locked = false;
          }
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
    ready,
    refGroupsMethods,
    refGroups
  ];
}

export default useRefGroups;
