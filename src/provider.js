var React = require('react');
var processConfig = require('./process-config');
var RefGroupContext = React.createContext();

function RefProvider(props) {
  return React.createElement(
    RefGroupContext.Provider,
    {
      value: processConfig(props.config),
      children: props.children
    },
  );
}

module.exports = {
  RefGroupContext,
  RefProvider
};
