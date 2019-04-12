import React from 'react';
import { useRefGroups } from 'react-ref-groupie';

import withIterateState from '../with-iterate-state';

import './squares.scss';

const StatelessSquares = ({
  num,
  iterate
}) => {
  const [
    ready,
    {
      squares: {
        moveLeft,
        moveRight
      }
    },
    {
      squares: {
        firstSquare,
        secondSquare,
        thirdSquare,
      }
    }
  ] = useRefGroups({
    squares: `
      firstSquare
      secondSquare
      thirdSquare
    `
  });

  if (!ready) {
    return null;
  }

  return (
    <div
      onClick={iterate(moveRight, moveLeft)}
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

export default withIterateState(StatelessSquares);
