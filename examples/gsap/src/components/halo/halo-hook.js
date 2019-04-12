import React from 'react';
import { useRefGroups } from 'react-ref-groupie';

import './halo.scss'

const HaloHook = () => {
  const [
    ready,
    {},
    {
      circles: {
        halo
      }
    }
  ] = useRefGroups({
    circles: 'halo'
  });

  if (!ready) {
    return null;
  }

  return <div ref={halo} className="halo" />
};

export default HaloHook;
