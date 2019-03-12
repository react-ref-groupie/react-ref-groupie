import React from 'react';

import Controls from '../controls';
import { StatelessCircles } from '../circles';
import { StatelessSquares } from '../squares';
import Halo from '../halo';

const InvalidStateless = () => (
  <div className="app">
    <Halo />
    <Controls />
    <StatelessCircles />
    <StatelessSquares />
  </div>
);

export default InvalidStateless;
