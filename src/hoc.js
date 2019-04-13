import React from 'react';
import { RefGroupContext } from './provider';
import initRefGroups from './init-ref-groups';

import { clearRefByMark } from './helpers';

class GroupManager extends React.Component {
  constructor(props) {
    super(props);

    this.memoized = {};
    this.mark = Math.random();
  }

  componentWillUnmount = () => {
    const { updateRefGroups } = this.props;

    let shouldUpdate = false;
    for (let groupName in this.memoized) {
      for (let refName in this.memoized[groupName]) {
        const internalRef = this.memoized[groupName][refName];
        clearRefByMark(internalRef, this.mark);
        shouldUpdate = true;
      }
    }

    if (shouldUpdate) {
      updateRefGroups();
    }
  }

  getRefGroups = (obj) => {
    const {
      refGroups: {
        internalRefs
      },
      updateRefGroups
    } = this.props;

    return initRefGroups(
      this,
      internalRefs,
      obj,
      updateRefGroups
    );
  }

  render() {
    const {
      refGroups: {
        refGroupsMethods,
      },
      WrappedComponent,
      wrappedComponentProps
    } = this.props;

    return (
      <WrappedComponent
        {...wrappedComponentProps}
        refGroupsMethods={refGroupsMethods}
        getRefGroups={this.getRefGroups}
      />
    );
  }
}

const withRefGroups = (WrappedComponent) => {
  const RefGroupsConsumer = (props) => {
    return (
      <RefGroupContext.Consumer>
        {
          ({ refGroups, updateRefGroups }) => (
            <GroupManager
              refGroups={refGroups}
              updateRefGroups={updateRefGroups}
              WrappedComponent={WrappedComponent}
              wrappedComponentProps={props}
            />
          )
        }
      </RefGroupContext.Consumer>
    );
  };

  RefGroupsConsumer.displayName = `withRefGroups(${WrappedComponent.name})`;

  return RefGroupsConsumer;
}

export default withRefGroups;
