import React from 'react';

import Controls from '../controls';
import { ClassCircles } from '../circles';
import { ClassSquares } from '../squares';
import Halo from '../halo';

const ClassComponents = () => (
  <div className="app">
    <Halo />
    <Controls />
    <ClassCircles />
    <ClassSquares />
  </div>
);

export default ClassComponents;
