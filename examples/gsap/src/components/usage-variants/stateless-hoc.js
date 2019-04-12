import React from 'react';

import Controls from '../controls';
import { StatelessCirclesHOC } from '../circles';
import { StatelessSquaresHOC } from '../squares';
import { StatelessHaloHOC } from '../halo';

const StatelessHOC = () => (
  <div className="app">
    <StatelessHaloHOC />
    <Controls />
    <StatelessCirclesHOC />
    <StatelessSquaresHOC />
  </div>
);

export default StatelessHOC;
