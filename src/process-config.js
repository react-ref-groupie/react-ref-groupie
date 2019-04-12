import { createRef } from 'react';

import {
  splitTemplate,
  logNameCollisionError,
  logRefUsageError,
  getRefsCurrent
} from './helpers';

const REFS = 'refs';
const GLOBALS = 'globals';

const processConfig = (config) => {
  const refGroupsMethods = {};
  const refs = {};
  const globals = {};

  for (let configKey in config) {
    const currentConfig = config[configKey];

    refGroupsMethods[configKey] = {};
    refs[configKey] = {};

    for (let key in currentConfig) {
      switch(key) {
        case REFS:
        case GLOBALS: {
          splitTemplate(currentConfig[key])
            .forEach((refName) => {
              if (refs[configKey][refName]) {
                logNameCollisionError(configKey, refName);
                return;
              }

              if (key === REFS) {
                refs[configKey][refName] = {
                  ref: createRef(),
                  lockedOn: []
                };
              } else {
                if (!globals[refName]) {
                  globals[refName] = {
                    ref: createRef(),
                    lockedOn: []
                  };
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
            const refGroupValid = Object.keys(refs[configKey]).reduce((accum, refKey) => {
              return accum && refs[configKey][refKey].lockedOn.length <= 1;
            }, true);

            if (!refGroupValid) {
              logRefUsageError(configKey);
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

  return {
    refGroupsMethods,
    internalRefs: refs
  };
};

export default processConfig;
