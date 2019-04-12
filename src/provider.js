import React from 'react';
import processConfig from './process-config';

export const RefGroupContext = React.createContext();

export class RefProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refGroups: processConfig(props.config)
    };
  }

  updateRefGroups = () => {
    this.forceUpdate();
  };

  render() {
    const { refGroups } = this.state;

    const contextValue = {
      refGroups,
      updateRefGroups: this.updateRefGroups
    };

    return (
      <RefGroupContext.Provider
        value={contextValue}
      >
        {this.props.children}
      </RefGroupContext.Provider>
    );
  }
}
