import React from 'react';
import { consumeRefs } from 'react-ref-groupie';

import './halo.scss'

const Halo = ({
  getRefGroups
}) => {
  const {
    circles: {
      halo
    }
  } = getRefGroups({
    circles: 'halo'
  });

  return <div ref={halo} className="halo" />
};

export default consumeRefs(Halo);
