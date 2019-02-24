import React from 'react';

import useRefGroup from 'ref-groupie';

import './controls.scss';

const Controls = ({
  refGroupie: {
    circles,
    squares
  }
}) => (
  <div className="controls">
    <div
      className="controls__button"
      onClick={circles.moveUp}
    >
      Circles down
    </div>
    <div
      className="controls__button"
      onClick={circles.moveDown}
    >
      Circles up
    </div>
    <div
      className="controls__button"
      onClick={squares.moveRight}
    >
      Squares right
    </div>
    <div
      className="controls__button"
      onClick={squares.moveLeft}
    >
      Squares left
    </div>
  </div>
);

export default useRefGroup(Controls);
