/**
 * Check if given parameter is an Object, excluding Array.
 * @param obj - Object to check.
 * @returns {boolean} - true if object is an Object, false otherwise.
 */
module.exports = (obj) => obj === Object(obj) && !Array.isArray(obj);