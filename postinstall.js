const ncp=require('ncp').ncp;
const fs = require('fs');
const path= require('path');

const basepath = __dirname;
const src = path.join(basepath,'src','cypress','commands','chainable.ts');
const dst = path.join(basepath,'..','..','cypress','support', 'chainable.ts');

const fixturesSrc=path.join(basepath,'node_modules','umbraco-cypress-testhelpers','cypress','fixtures','prevaluesource.txt');
const fixturesDst = path.join(basepath,'cypress','fixtures', 'prevaluesouce.txt');

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
    console.log('Copy prevaluesource.txt file');
    ncp(fixturesSrc, fixturesDst);    
  }
} catch(err) {
  console.error(fixturesDst)
}