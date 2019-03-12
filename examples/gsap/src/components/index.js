import React, { Component } from 'react';
import { RefProvider } from 'react-ref-groupie';

import UsageVariants from './usage-variants';
import refConfig from '../ref-config';
import './index.scss'

class App extends Component {
  render() {
    return (
      <RefProvider config={refConfig}>
        <UsageVariants />
      </RefProvider>
    );
  }
}

export default App;
