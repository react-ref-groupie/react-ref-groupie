var React = require('react');
var createReactClass = require('create-react-class');
var RefGroupContext = require('./provider').RefGroupContext;
var helpers = require('./helpers');

var GroupManager = createReactClass({
  getRefGroups: function(obj) {
    var groupName, refGroup;
    var self = this;
    var result = {};
    var mockObject = {};
    var internalRefs = this.props.refGroups.internalRefs;
    var blockGroups = this.props.refGroups.blockGroups;
    this.mark = this.mark || Math.random();
    this.refBuffer = this.refBuffer || [];

    for (groupName in obj) {
      result[groupName] = {};
      mockObject[groupName] = {};
      if (!internalRefs[groupName]) {
        // TODO: add warning if there is no such group
        break;
      }

      refGroup = internalRefs[groupName];

      helpers
        .splitTemplate(obj[groupName])
        .forEach(function(refName) {
          if (!refGroup[refName]) {
            // TODO: add warning that there is not such ref in config
            return;
          } else if (refGroup[refName].locked) {
            if (!self.invalid) {
              blockGroups(obj, self.mark);
            }
            self.invalid = true;
            return;
          }
          self.refBuffer.push(refGroup[refName]);
          result[groupName][refName] = refGroup[refName].ref;
        });
    }

    if (this.invalid) {
      return mockObject;
    }

    this.refBuffer.forEach(function(refObj) {
      refObj.locked = true;
    });
    return result;
  },

  componentWillUnmount: function() {
    if (this.invalid) {
      this.props.refGroups.unblockGroups(this.mark);
      return;
    }

    this.refBuffer && this.refBuffer.forEach(function(refObj) {
      refObj.locked = false;
    });
  },

  render: function() {
    var refGroupsMethods = this.props.refGroups.refGroupsMethods;
    var WrappedComponent = this.props.WrappedComponent;
    var wrappedComponentProps = this.props.wrappedComponentProps;

    return React.createElement(
      WrappedComponent,
      Object.assign(
        {},
        wrappedComponentProps,
        {
          refGroupsMethods,
          getRefGroups: this.getRefGroups
        }
      )
    );
  }
});

function RefConsumer(WrappedComponent) {
  return function(props) {
    return React.createElement(
      RefGroupContext.Consumer,
      null,
      function(refGroups) {
        return React.createElement(
          GroupManager,
          {
            refGroups,
            WrappedComponent,
            wrappedComponentProps: props
          }
        )
      }
    );
  };
}

module.exports = RefConsumer;
