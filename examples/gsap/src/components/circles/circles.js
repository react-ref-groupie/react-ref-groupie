import React from 'react';
import useRefGroup from 'ref-groupie';

import './circles.scss';

const Circles = ({
  refGroupie: {
    circles: {
      firstCircle,
      secondCircle,
      thirdCircle,
      moveUp,
      moveDown
    } = {},
  } = {},
}) => {
  return (
    <div className="circles">
      <div ref={firstCircle} className="circles__first" />
      <div ref={secondCircle} className="circles__second" />
      <div ref={thirdCircle} className="circles__third" />
    </div>
  );
};

export default useRefGroup(Circles);
