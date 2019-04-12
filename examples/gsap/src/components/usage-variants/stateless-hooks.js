import React from 'react';

import Controls from '../controls';
import { StatelessCirclesHook } from '../circles';
import { StatelessSquaresHook } from '../squares';
import { StatelessHaloHook } from '../halo';

const StatelessHooks = () => (
  <div className="app">
    <StatelessHaloHook />
    <Controls />
    <StatelessCirclesHook />
    <StatelessSquaresHook />
  </div>
);

export default StatelessHooks;
