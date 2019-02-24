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
    res[key] = obj[key].current;
  }
  return res;
}

module.exports = {
  splitTemplate,
  getRefsCurrent
};
