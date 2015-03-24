var browsers = [
  // {
  //   browserName: 'internet explorer',
  //   platform: 'Windows 7',
  //   version: '8'
  // },
  // {
  //   browserName: 'internet explorer',
  //   platform: 'Windows 7',
  //   version: '9'
  // }, {
  //   browserName: 'internet explorer',
  //   platform: 'Windows 7',
  //   version: '10'
  // }, {
  //   browserName: 'internet explorer',
  //   platform: 'Windows 7',
  //   version: '11'
  // }, {
  //   browserName: 'internet explorer',
  //   platform: 'Windows 11',
  //   version: '11'
  // },

  {
    browserName: 'chrome',
    version: '41.0.2272',
    platform: 'OSX 10.10'
  }
  // ,

  // {
  //   browserName: 'chrome',
  //   version: '40.0.2214',
  //   platform: 'OSX 10.10'
  // }, {
  //   browserName: 'safari',
  //   version: '6',
  //   platform: 'OSX 10.8'
  // }, {
  //   browserName: 'safari',
  //   version: '7',
  //   platform: 'OSX 10.9'
  // },

  // {
  //   browserName: 'safari',
  //   version: '8',
  //   platform: 'OSX 10.10'
  // }

  // , {
  //   browserName: 'firefox',
  //   version: '36',
  //   platform: 'OSX 10.10'
  // }, {
  //   browserName: 'firefox',
  //   version: '35',
  //   platform: 'OSX 10.10'
  // }, {
  //   browserName: 'firefox',
  //   version: '34',
  //   platform: 'OSX 10.10'
  // }
].map(function(e) {
  return {
    browserName: e.browserName,
    version: e.version,
    platform: e.platform,
    name: e.browserName + '-' + e.version + '-' + e.platform
  };
});

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  maxSessions: 1,

  multiCapabilities: browsers,

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
