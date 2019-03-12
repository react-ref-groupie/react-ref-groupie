import React from 'react';

import ClassComponents from './class-components';
import StatelessHoc from './stateless-hoc';
// import StatelessWithHooks from './stateless-with-hooks';

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
          <li onClick={this.changeTab(1)}>Invalid stateless usage</li>
          <li onClick={this.changeTab(2)}>Stateless valid usage</li>
        </ul>
        {tab === 0 && <ClassComponents />}
        {tab === 1 && <StatelessHoc />}
        {/* tab === 2 && <StatelessWithHooks /> */}
      </React.Fragment>
    );
  }
}

export default UsageVariants;
