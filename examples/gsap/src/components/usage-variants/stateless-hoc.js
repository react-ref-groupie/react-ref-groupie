import React from 'react';

import Controls from '../controls';
import { StatelessCirclesHoc } from '../circles';
import { StatelessSquaresHoc } from '../squares';
import Halo from '../halo';

const InvalidStateless = () => (
  <div className="app">
    <Halo />
    <Controls />
    <StatelessCirclesHoc />
    <StatelessSquaresHoc />
  </div>
);

export default InvalidStateless;