import React, { Component } from 'react';
import { RefProvider } from 'react-ref-groupie';

import refConfig from '../ref-config';
import Controls from './controls';
import Circles from './circles';
import Squares from './squares';
import Halo from './halo';
import './index.scss'

class App extends Component {
  render() {
    return (
      <RefProvider config={refConfig}>
        <div className="app">
          <Halo />
          <Controls />
          <Circles />
          <Squares />
        </div>
      </RefProvider>
    );
  }
}

export default App;
