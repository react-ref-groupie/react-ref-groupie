var React = require('react');
var processConfig = require('./process-config');
var RefGroupContext = React.createContext();

function RefProvider({ children, config }) {
  return React.createElement(
    RefGroupContext.Provider,
    {
      value: processConfig(config),
      children
    },
  );
}

module.exports = {
  RefGroupContext,
  RefProvider
};
