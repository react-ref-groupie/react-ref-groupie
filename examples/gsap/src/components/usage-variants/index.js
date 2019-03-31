import React from 'react';

import ClassComponents from './class-components';
import StatelessHoc from './stateless-hoc';
import StatelessHooks from './stateless-hooks';

class UsageVariants extends React.Component {
  state = {
    tab: 0
  }

  changeTab = (tabNum) => () =>
    this.setState({ tab: tabNum });

  render() {
    const { tab } = this.state;

    return (
      <React.Fragment>
        <ul>
          <li onClick={this.changeTab(0)}>Class components usage</li>
          <li onClick={this.changeTab(1)}>Stateless hook usage</li>
          <li onClick={this.changeTab(2)}>Stateless HOC usage</li>
        </ul>
        {tab === 0 && <ClassComponents />}
        {tab === 1 && <StatelessHooks />}
        {tab === 2 && <StatelessHoc />}
      </React.Fragment>
    );
  }
}

export default UsageVariants;
