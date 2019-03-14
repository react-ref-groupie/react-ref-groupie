import React from 'react';
import processConfig from './process-config';

export const RefGroupContext = React.createContext();

export const RefProvider = (props) => {
  return React.createElement(
    RefGroupContext.Provider,
    {
      value: processConfig(props.config),
      children: props.children
    },
  );
}
