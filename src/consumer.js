import React from 'react';
import { RefGroupContext } from './provider';
import { splitTemplate } from './helpers';

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
    this.mark = this.mark || Math.random();

    const mockObject = {};
    const {
      refGroups: {
        internalRefs,
        blockGroups
      }
    } = this.props;

    const keepRefs = {};
    let result;
    try {
      result = Object.keys(obj).reduce(
        (accum, groupName) => {
          accum[groupName] = {};
          mockObject[groupName] = {};
          keepRefs[groupName] = {};
          this.memoized[groupName] = this.memoized[groupName] || {};

          if (!internalRefs[groupName]) {
            // TODO: add warning if there is no such group
            return accum;
          }

          const refNames = splitTemplate(obj[groupName]);
          refNames.forEach((refName) => {
            if (this.memoized[groupName][refName]) {
              // repeated
              accum[groupName][refName] = this.memoized[groupName][refName].ref;
            } else {
              // lock
              const refGroup = internalRefs[groupName];

              if (!refGroup[refName]) {
                // TODO: add warning that there is not such ref in config
                return accum;
              } else if (refGroup[refName].locked) {
                if (!this.invalid) {
                  blockGroups(obj, this.mark);
                }
                this.invalid = true;
                throw new Error();
              }

              accum[groupName][refName] = refGroup[refName].ref;
              this.memoized[groupName][refName] = refGroup[refName];
              refGroup[refName].locked = true;
            }

            keepRefs[groupName][refName] = true;
          });

          return accum;
        },
        {}
      );
    } catch (e) {
      return mockObject;
    }

    // unlock and delete from memoized
    for (let groupName in this.memoized) {
      for (let refName in this.memoized[groupName]) {
        if (keepRefs[groupName][refName]) {
          break;
        }

        this.memoized[groupName][refName].locked = false;
        delete this.memoized[groupName][refName];
      }
    }

    return result;
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
