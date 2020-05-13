const ncp=require('ncp').ncp;
const fs = require('fs');
const path= require('path');

const basepath = process.argv.slice(2)[0];
const src = path.join(basepath,'node_modules','umbraco-cypress-testhelpers','src','cypress','commands','chainable.ts');
const dst = path.join(basepath,'cypress','support', 'chainable.ts');

const fixturesSrc=path.join(basepath,'node_modules','umbraco-cypress-testhelpers','cypress','fixtures','prevalueSourceFile.txt');
const fixturesDst = path.join(basepath,'cypress','fixtures', 'prevalueSourceFile.txt');

try {
  if (fs.existsSync(src)) {          
    console.log('Copy chainable.ts file');
    ncp(src, dst);    
  }
} catch(err) {
  console.error(err)
}
try {
  if (fs.existsSync(fixturesSrc)) {          
    console.log('Copy prevalueSourceFile.txt file');
    ncp(fixturesSrc, fixturesDst);    
  }
} catch(err) {
  console.error(fixturesDst)
}