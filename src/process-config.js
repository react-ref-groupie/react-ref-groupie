import {
  splitTemplate,
  logNameCollisionError,
  createRef,
  logRefUsageError,
  getRefsCurrent
} from './helpers';

const processConfig = (config) => {
  const refGroupsMethods = {};
  const refs = {};
  const globals = {};
  const blockedGroups = {};

  for (let configKey in config) {
    const currentConfig = config[configKey];
    const refUsageErrors = [];

    refGroupsMethods[configKey] = {};
    refs[configKey] = {};

    for (let key in currentConfig) {
      switch(key) {
        case 'refs':
        case 'globals': {
          splitTemplate(currentConfig[key])
            .forEach((refName) => {
              if (refs[configKey][refName]) {
                logNameCollisionError(configKey, refName);
                return;
              }

              if (key === 'refs') {
                refs[configKey][refName] = createRef();
              } else {
                if (!globals[refName]) {
                  globals[refName] = createRef();
                }
                refs[configKey][refName] = globals[refName];
              }
            });

          break;
        }

        default: {
          if (refs[key]) {
            logNameCollisionError(configKey, key);
            return;
          }

          refGroupsMethods[configKey][key] = (args) => {
            if (refUsageErrors.length > 0) {
              logRefUsageError(refUsageErrors);
              return;
            }
            currentConfig[key](
              getRefsCurrent(refs[configKey]),
              args
            );
          }
        }
      }
    }
  };

  const blockGroups = (blockingGroups, consumerMark) => {
    for (let key in blockingGroups) {
      if (config[key]) {
        blockedGroups[key] = (blockedGroups[key] || [])
          .concat(consumerMark);
      }
    }
  };

  const unblockGroups = (consumerMark) => {
    for (let key in blockedGroups) {
      const index = blockedGroups[key].indexOf(consumerMark);

      if (index !== -1) {
        blockedGroups[key].splice(index, 1);
      }
    }
  };

  return {
    refGroupsMethods,
    internalRefs: refs,
    blockGroups,
    unblockGroups,
    blockedGroups
  };
};

export default processConfig;
