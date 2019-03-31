import React from 'react';

import Controls from '../controls';
import { StatelessCirclesHook } from '../circles';
import { StatelessSquaresHook } from '../squares';
import Halo from '../halo';

const InvalidStateless = () => (
  <div className="app">
    <Halo />
    <Controls />
    <StatelessCirclesHook />
    <StatelessSquaresHook />
  </div>
);

export default InvalidStateless;
