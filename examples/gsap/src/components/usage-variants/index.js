import React from 'react';
import { Helmet } from 'react-helmet';

import ClassComponents from './class-components';
import StatelessHOC from './stateless-hoc';
import StatelessHooks from './stateless-hooks';
import './usage-variants.scss';
import bemClass from '../helpers/bem-class';

const baseClass = 'usage-variants';

const button = bemClass((tab) => ({
  [`${baseClass}__button`]: true,
  [`${baseClass}__button--active`]: tab
}));

const getClasses = (tab) => ({
  base: baseClass,
  firstButton: button(tab === 0),
  secondButton: button(tab === 1),
  thirdButton: button(tab === 2)
});

const colors = [
  'blue',
  'pink',
  'green'
];

class UsageVariants extends React.Component {
  state = {
    tab: 0
  };

  changeTab = (tabNum) => () =>
    this.setState({ tab: tabNum });

  render() {
    const { tab } = this.state;

    const bc = getClasses(tab);

    return (
      <React.Fragment>
        <Helmet>
          <body className={`page--${colors[tab]}`} />
        </Helmet>

        <ul className={bc.base}>
          <li
            className={bc.firstButton}
            onClick={this.changeTab(0)}
          >
            Class components usage
          </li>
          <li
            className={bc.secondButton}
            onClick={this.changeTab(1)}
          >
            Stateless hook usage
          </li>
          <li
            className={bc.thirdButton}
            onClick={this.changeTab(2)}
          >
            Stateless HOC usage
          </li>
        </ul>
        {tab === 0 && <ClassComponents />}
        {tab === 1 && <StatelessHooks />}
        {tab === 2 && <StatelessHOC />}
      </React.Fragment>
    );
  }
}

export default UsageVariants;
