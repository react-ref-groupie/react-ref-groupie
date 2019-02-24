var React = require('react');
var RefGroupContext = require('./provider').RefGroupContext;

function RefConsumer(WrappedComponent) {
  return function(props) {
    return React.createElement(
      RefGroupContext.Consumer,
      null,
      function(groups) {
        return React.createElement(
          WrappedComponent,
          Object.assign({}, props, { refGroupie: groups })
        )
      }
    );
  };
};

module.exports = RefConsumer;
