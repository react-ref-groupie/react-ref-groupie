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
      var refUsageErrors = [];

      for (key in currentConfig) {
        (function(key) {
          switch(key) {
            case 'refs':
            case 'globals': {
              helpers.splitTemplate(currentConfig[key])
                .forEach(function(refName) {
                  if (refs[refName]) {
                    helpers.logNameCollisionError(configKey, refName);
                    return;
                  }

                  if (key === 'refs') {
                    refs[refName] = createRef();
                  } else {
                    if (!globals[refName]) {
                      globals[refName] = createRef();
                    }
                    refs[refName] = globals[refName];
                  }

                  Object.defineProperty(result, refName, {
                    get() {
                      if (refs[refName].current === null) {
                        return refs[refName];
                      }

                      refUsageErrors.push({ group: configKey, ref: refName });
                      helpers.logRefUsageError(refUsageErrors);
                    }
                  });
                });

              break;
            }

            default: {
              if (refs[key]) {
                helpers.logNameCollisionError(configKey, key);
                return;
              }

              result[key] = function(args) {
                if (refUsageErrors.length > 0) {
                  helpers.logRefUsageError(refUsageErrors);
                  return;
                }

                currentConfig[key](helpers.getRefsCurrent(refs), args);
              }
            }
          }
        })(key);
      }

      return result;
    })(config[configKey]);
  }

  return res;
};

module.exports = processConfig;
