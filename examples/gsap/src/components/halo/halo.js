import React from 'react';

import useRefGroup from 'react-ref-groupie';

import './halo.scss'

const Halo = ({
  refGroupie: {
    circles: {
      halo
    }
  }
}) => <div ref={halo} className="halo" />;

export default useRefGroup(Halo);
