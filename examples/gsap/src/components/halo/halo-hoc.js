import React from 'react';
import withRefGroups from 'react-ref-groupie';

import './halo.scss'

const HaloHOC = ({
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

export default withRefGroups(HaloHOC);
