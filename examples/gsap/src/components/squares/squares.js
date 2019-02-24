import React from 'react';
import useRefGroup from 'ref-groupie';

import './squares.scss';

const Squares = ({
  refGroupie: {
    squares: {
      firstSquare,
      secondSquare,
      thirdSquare,
      moveRight,
      moveLeft
    },
  },
}) => (
  <div className="squares">
    <div ref={firstSquare} className="squares__first" />
    <div ref={secondSquare} className="squares__second" />
    <div ref={thirdSquare} className="squares__third" />
  </div>
);

export default useRefGroup(Squares);
