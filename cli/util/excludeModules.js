/**
 * Exclude modules from 'node_modules' and 'bower_components', except the ones
 * provided as argument to this function.
 * @param {Array} keep - Modules to keep included.
 * @returns {RegExp} - Regex used by a loader.
 */
module.exports = (keep = []) => new RegExp('(node_modules|bower_components)(?![\\\/](' + keep.join('|') + ')).*');