var reactCreateRef = require('react').createRef;

function splitTemplate(str) {
  return str
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');
}

function getRefsCurrent(obj) {
  var res = {};
  var key;
  for (key in obj) {
    res[key] = obj[key].ref.current;
  }
  return res;
}

function createRef() {
  return {
    ref: reactCreateRef(),
    locked: false
  };
}

function logNameCollisionError(groupName, refName) {
  console.error('Ref group [' + groupName + '] have naming collision on ' +
    'name [' + refName + '], check your config');
}

function logRefUsageError(refUsageErrors) {
  var errorMessage = 'Check your ref usage - each ref should be used ones at a time:/n';

  refUsageErrors.forEach(function(refUsageError) {
    errorMessage += 'group ['
      + refUsageError.group
      + '] - ref ['
      + refUsageError.ref
      + ']/n';
  });

  console.error(errorMessage);
}

module.exports = {
  splitTemplate,
  getRefsCurrent,
  logNameCollisionError,
  logRefUsageError,
  createRef
};
