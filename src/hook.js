import {
  useState,
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
        internalRefs,
        obj,
        updateRefGroups
      );

      setReady(true);

      return () => {
        const {
          current: {
            memoized
          }
        } = self;

        for (let groupName in memoized) {
          for (let refName in memoized[groupName]) {
            const internalRef = memoized[groupName][refName];
            clearRefByMark(internalRef, self.current.mark);
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
