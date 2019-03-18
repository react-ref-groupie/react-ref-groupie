import React from 'react';
import processConfig from './process-config';

export const RefGroupContext = React.createContext();

export const RefProvider = (props) => (
  <RefGroupContext.Provider
    value={processConfig(props.config)}
  >
    {props.children}
  </RefGroupContext.Provider>
);
