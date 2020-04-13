var path=require('path');
var execFile = require('child_process').execFile;
var iisExpressExe = 'c:\\Program Files\\IIS Express\\iisexpress.exe';
var sitePath = path.join(__dirname, '..\\Umbraco.Forms.TestSite');
var args = [
    '/port:9000',
    '/path:' +sitePath 
];
var childProcess = execFile(iisExpressExe , args, {});
childProcess.stdout.on('data', function(data) {
    console.log(removeTrailingLinebreak(data));
});

childProcess.stderr.on('data', function(data) {
    console.log(removeTrailingLinebreak(data));
});

var removeTrailingLinebreak = function (input) {
    return input.replace(/\s+$/, '');
}
