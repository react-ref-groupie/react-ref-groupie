const bemClass =
config =>
param => {
  const resultConfig = config(param);

  return Object.keys(resultConfig).reduce((accum, key) => {
    const useKey = !!resultConfig[key];
    if (useKey) {
      return `${accum} ${key}`;
    }
    return accum;
  }, '');
}

export default bemClass;
