import React from 'react';

const useIterateState = (WrappedComponent) => {
  class StatefullWrapper extends React.Component {
    state = {
      num: 0
    };

    iterate = (caller1, caller2) => () => {
      this.state.num % 2 === 0
        ? caller1(this.increment)
        : caller2(this.increment);
    };

    increment = () => this.state(({ num }) => ({ num: ++num }));

    render() {
      return (
        <WrappedComponent
          {...this.props}
          num={this.state.num}
          iterate={this.iterate}
        />
      );
    }
  };
  StatefullWrapper.displayName = `useIterateState(${WrappedComponent.displayName})`;

  return StatefullWrapper;
};

export default useIterateState;
