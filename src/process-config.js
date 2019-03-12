var helpers = require('./helpers');

function processConfig(config) {
  var refGroupsMethods = {};
  var refs = {};
  var _globals = {};
  var _configKey;
  var blockedGroups = {};

  for (_configKey in config) {
    (function(_currentConfig, _configKey) {
      var _key;
      var _refUsageErrors = [];
      refGroupsMethods[_configKey] = {};
      refs[_configKey] = {};

      for (_key in _currentConfig) {
        (function(_key) {
          switch(_key) {
            case 'refs':
            case 'globals': {
              helpers.splitTemplate(_currentConfig[_key])
                .forEach(function(_refName) {
                  if (refs[_configKey][_refName]) {
                    helpers.logNameCollisionError(_configKey, _refName);
                    return;
                  }

                  if (_key === 'refs') {
                    refs[_configKey][_refName] = helpers.createRef();
                  } else {
                    if (!_globals[_refName]) {
                      _globals[_refName] = helpers.createRef();
                    }
                    refs[_configKey][_refName] = _globals[_refName];
                  }
                });

              break;
            }

            default: {
              if (refs[_key]) {
                helpers.logNameCollisionError(_configKey, _key);
                return;
              }

              refGroupsMethods[_configKey][_key] = function(args) {
                if (_refUsageErrors.length > 0) {
                  helpers.logRefUsageError(_refUsageErrors);
                  return;
                }
                _currentConfig[_key](
                  helpers.getRefsCurrent(refs[_configKey]),
                  args
                );
              }
            }
          }
        })(_key);
      }
    })(config[_configKey], _configKey);
  }

  function blockGroups(blockingGroups, consumerMark) {
    var key;
    for (key in blockingGroups) {
      if (config[key]) {
        blockedGroups[key] = (blockedGroups[key] || [])
          .concat(consumerMark);
      }
    }
  }

  function unblockGroups(consumerMark) {
    var key, index;
    for (key in blockedGroups) {
      index = blockedGroups[key].indexOf(consumerMark);
      if (index !== -1) {
        blockedGroups[key].splice(index, 1);
      }
    }
  }

  return {
    refGroupsMethods,
    internalRefs: refs,
    blockGroups,
    unblockGroups,
    blockedGroups
  };
};

module.exports = processConfig;
