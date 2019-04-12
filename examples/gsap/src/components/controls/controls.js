import React from 'react';
import withRefGroups from 'react-ref-groupie';

import './controls.scss';

const Controls = ({
  refGroupsMethods: {
    circles,
    squares
  }
}) => (
  <div className="controls">
    <div
      className="controls__button"
      onClick={circles.moveDown}
    >
      Circles down
    </div>
    <div
      className="controls__button"
      onClick={circles.moveUp}
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

export default withRefGroups(Controls);
