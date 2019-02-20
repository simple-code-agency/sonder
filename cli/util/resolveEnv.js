const path = require('path');

module.exports = (envName, { defaultEnv, root, suffix, localSuffix }, failOnError) => {
  envName = (typeof envName === 'string' || envName instanceof String) ? envName : null;
  
  if(!(envName || defaultEnv)) {
    console.log('Environment was not provided, nor was the default environment set.');
    if(failOnError) process.exit(1);
  
    console.log('Using default config.');
    return {};
  }
  
  if(!envName) envName = defaultEnv;
  
  const filename = `${envName}${suffix}.js`;
  const filenameLocal = `${envName}${localSuffix}.js`;
  
  const envPath = path.resolve(root, filename);
  const envPathLocal = path.resolve(root, filenameLocal);
  
  try {
    return require(envPathLocal);
  } catch(err) {
    try {
      return require(envPath);
    } catch(err) {
      console.log(`There was an error loading environment ${filename}.`);
      
      if(failOnError) {
        console.log(err.message);
        process.exit(1);
      }
  
      console.log('Using default config.');
      return {};
    }
  }
};