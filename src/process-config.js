var createRef = require('react').createRef;
var helpers = require('./helpers');

function processConfig(config) {
  var globals = {};
  var res = {};
  var configKey;

  for (configKey in config) {
    res[configKey] = (function(currentConfig) {
      var refs = {};
      var result = {};
      var key;
      var valid = true;

      if (currentConfig.refs) {
        helpers.splitTemplate(currentConfig.refs)
          .forEach(function(refName) {
            if (refs[refName]) {
              console.error(`Ref group ${configKey} have naming collision on ` +
                `${refName} name, please fix it`);
              return;
            }

            refs[refName] = createRef();

            Object.defineProperty(result, refName, {
              get() {
                if (refs[refName].current === null) {
                  return refs[refName];
                }
                console.warn('Check your ref usage! Each ref should be used ones ' +
                  'at a time');
                valid = false;
              }
            });
          });
      }

      if (currentConfig.globals) {
        helpers.splitTemplate(currentConfig.globals)
          .forEach(function(globalName) {
            if (refs[globalName]) {
              console.error(`Ref group ${configKey} have naming collision on ` +
                `${globalName} name, please fix it`);
              return;
            }

            if (!globals[globalName]) {
              globals[globalName] = createRef();
            }
            refs[globalName] = globals[globalName];

            Object.defineProperty(result, globalName, {
              get() {
                if (refs[globalName].current === null) {
                  return refs[globalName];
                }
                console.warn('Check your ref usage! Each global ref should be used ones ' +
                  'at a time');
                valid = false;
              }
            });
          });
      }

      for (key in currentConfig) {
        if (key === 'refs' || key === 'globals') {
          continue;
        }

        if (refs[key]) {
          console.error(`Ref group ${configKey} have naming collision on ` +
            `${key} name, please fix it`);
          continue;
        }

        result[key] = function(args) {
          if (!valid) {
            console.warn('Check your ref usage! Each ref should be used ones ' +
            'at a time');
            return;
          }
          currentConfig[key](helpers.getRefsCurrent(refs), args);
        }
      }

      return result;
    })(config[configKey]);
  }

  return res;
};

module.exports = processConfig;
