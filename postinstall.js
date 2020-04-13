const ncp=require('ncp').ncp;
const fs = require('fs');
const path= require('path');

const basepath = process.argv.slice(2)[0];
const src = path.join(basepath,'node_modules','umbraco-cypress-testhelpers','src','cypress','commands','chainable.ts');
const dst = path.join(basepath,'cypress','support', 'chainable.ts');

try {
  if (fs.existsSync(src)) {          
    console.log('Copy chainable.ts file');
    ncp(src, dst);    
  }
} catch(err) {
  console.error(err)
}
