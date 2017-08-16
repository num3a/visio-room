const getProp = (data, name) => {
  if (data === null || data === undefined) return '';

  if (data[name]) {
    return data[name];
  }
  return '';
};

export {
  getProp,
};
