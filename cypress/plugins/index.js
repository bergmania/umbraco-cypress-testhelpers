const { isFileExist } = require('cy-verify-downloads');
module.exports = (on, config) => {
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push('--window-size=1400,1200')

      return launchOptions
    }
  });
  on('task', {
    isFileExist
  });
}