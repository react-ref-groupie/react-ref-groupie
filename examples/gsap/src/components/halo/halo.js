import React from 'react';

import useRefGroups from 'react-ref-groupie';

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

export default useRefGroups(Halo);
