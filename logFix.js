const fs = require('fs');
const path = require('path');

const searchValue = 'log("info", "[HMR] Waiting for update signal from WDS...");';

const file = path.resolve('node_modules/webpack/hot/dev-server.js');

let contents = fs.readFileSync(file, 'utf-8');
contents = contents.replace(searchValue, `// ${searchValue}`);

fs.writeFileSync(file, contents);

console.log(`Removed "[HMR] Waiting for update signal from WDS..." message from '${file}'.`);

