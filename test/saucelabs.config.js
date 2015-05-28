var browsers = [{
//   browserName: 'internet explorer',
//   platform: 'Windows 7',
//   version: '8'
// }, {
//   browserName: 'internet explorer',
//   platform: 'Windows 7',
//   version: '9'
// }, {
//   browserName: 'internet explorer',
//   platform: 'Windows 7',
//   version: '10'
// }, {
  browserName: 'internet explorer',
  platform: 'Windows 7',
  version: '11'
}, {
  browserName: 'internet explorer',
  platform: 'Windows 8.1',
  version: '11'
}, {
  browserName: 'chrome',
  version: '41',
  platform: 'OSX 10.10'
}, {
  browserName: 'chrome',
  version: '40',
  platform: 'OSX 10.10'
}, {
//   browserName: 'safari',
//   version: '6',
//   platform: 'OSX 10.8'
// }, {
//   browserName: 'safari',
//   version: '7',
//   platform: 'OSX 10.9'
// }, {
//   browserName: 'safari',
//   version: '8',
//   platform: 'OSX 10.10'
// }, {
  browserName: 'firefox',
  version: '36',
  platform: 'OSX 10.10',
  loggingPrefs: {
    browser: 'SEVERE'
  }
}, {
  browserName: 'firefox',
  version: '35',
  platform: 'OSX 10.10',
  loggingPrefs: {
    browser: 'SEVERE'
  }
}, {
  browserName: 'firefox',
  version: '34',
  platform: 'OSX 10.10',
  loggingPrefs: {
    browser: 'SEVERE'
  }
}].map(function(browser) {
  browser.name = browser.browserName + '-' + browser.version + '-' + browser.platform;
  browser.build = process.env.TRAVIS_BUILD_NUMBER || (process.env.SAUCE_USERNAME + '-local-' + Date.now());
  browser['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER || 'local';
  return browser;
}).filter(function(browser) {
  return process.env.BROWSER ? process.env.BROWSER === browser.browserName : true;
});

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  maxSessions: 3,

  multiCapabilities: browsers,

  maxDuration: 300,

  framework: 'jasmine2',

  onPrepare: function() {
    require('jasmine-bail-fast');
    browser.ignoreSynchronization = true;
  },

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000
  }
};
