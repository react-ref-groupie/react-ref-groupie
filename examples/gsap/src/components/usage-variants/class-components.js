import React from 'react';

import Controls from '../controls';
import { ClassCircles } from '../circles';
import { ClassSquares } from '../squares';
import { StatelessHaloHOC } from '../halo';

const ClassComponents = () => (
  <div className="app app__class-usage">
    <StatelessHaloHOC />
    <Controls />
    <ClassCircles />
    <ClassSquares />
  </div>
);

export default ClassComponents;
