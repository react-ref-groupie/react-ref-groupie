import React from 'react';
import useRefGroups from 'react-ref-groupie';
import useIterateState from '../use-iterate-state';

import './squares.scss';

const StatelessSquares = ({
  num,
  iterate,
  getRefGroups,
  refGroupsMethods: {
    squares: {
      moveLeft,
      moveRight
    }
  }
}) => {
  const {
    squares: {
      firstSquare,
      secondSquare,
      thirdSquare,
    }
  } = getRefGroups({
    squares: `
      firstSquare
      secondSquare
      thirdSquare
    `
  });

  return (
    <div
      onClick={iterate(moveLeft, moveRight)}
      className="squares"
    >
      <div
        ref={firstSquare}
        className="squares__first"
      />
      <div
        ref={secondSquare}
        className="squares__second"
      >
        {num}
      </div>
      <div
        ref={thirdSquare}
        className="squares__third"
      />
    </div>
  );
};

export default useIterateState(useRefGroups(StatelessSquares));
