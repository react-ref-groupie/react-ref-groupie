import React from 'react';
import { RefGroupContext } from './provider';
import initRefGroups from './init-ref-groups';

class GroupManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ready: false };
    this.memoized = {};
  }

  componentDidMount = () => {
    this.setState({ ready: true });
  }

  componentWillUnmount = () => {
    if (this.invalid) {
      this.props.refGroups.unblockGroups(this.mark);
      return;
    }

    for (let groupName in this.memoized) {
      for (let refName in this.memoized[groupName]) {
        this.memoized[groupName][refName].locked = false;
      }
    }
  }

  getRefGroups = (obj) => {
    const {
      refGroups: {
        internalRefs,
        blockGroups
      }
    } = this.props;

    return initRefGroups(
      this,
      blockGroups,
      internalRefs,
      obj
    );
  }

  render() {
    const { ready } = this.state;

    if (!ready) {
      return null;
    }

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

const RefConsumer = (WrappedComponent) => {
  return (props) => {
    return (
      <RefGroupContext.Consumer>
        {
          (refGroups) => (
            <GroupManager
              refGroups={refGroups}
              WrappedComponent={WrappedComponent}
              wrappedComponentProps={props}
            />
          )
        }
      </RefGroupContext.Consumer>
    );
  };
}

export default RefConsumer;
