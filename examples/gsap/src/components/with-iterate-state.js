import React from 'react';

const withIterateState = (WrappedComponent) => {
  class StatefullWrapper extends React.Component {
    state = {
      num: 0,
      toggled: false
    };

    iterate = (caller1, caller2) => () => {
      const { toggled } = this.state;

      if (toggled) {
        caller2(this.increment);
      } else {
        caller1(this.increment);
      }

      this.setState(({ toggled }) => ({ toggled: !toggled }));
    };

    increment = () => this.setState(({ num }) => ({ num: ++num }));

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

  StatefullWrapper.displayName = `withIterateState(${WrappedComponent.name})`;

  return StatefullWrapper;
};

export default withIterateState;
