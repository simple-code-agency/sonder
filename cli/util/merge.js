const isObject = require('./isObject');

const merge = (obj1, obj2) => {
  const merged = {};
  
  Object.keys(obj1).forEach(key => {
    if(isObject(obj1[key]) && isObject(obj2[key])) {
      merged[key] = merge(obj1[key], obj2[key]);
    } else {
      merged[key] = obj2[key] == null ? obj1[key] : obj2[key];
    }
  });
  
  return merged;
};

module.exports = merge;