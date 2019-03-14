import React from 'react';
import useRefGroups from 'react-ref-groupie';

import useIterateState from '../use-iterate-state';

import './circles.scss';

const StatelessCircles = ({
  num,
  iterate,
  getRefGroups,
  refGroupsMethods: {
    circles: {
      moveUp,
      moveDown
    }
  }
}) => {
  const {
    circles: {
      firstCircle,
      secondCircle,
      thirdCircle,
    }
  } = getRefGroups({
    circles: `
      firstCircle
      secondCircle
      thirdCircle
    `
  });

  return (
    <div
      onClick={iterate(moveDown, moveUp)}
      className="circles"
    >
      <div
        ref={firstCircle}
        className="circles__first"
      />
      <div
        ref={secondCircle}
        className="circles__second"
      >
        {num}
      </div>
      <div
        ref={thirdCircle}
        className="circles__third"
      />
    </div>
  );
};

export default useIterateState(useRefGroups(StatelessCircles));
