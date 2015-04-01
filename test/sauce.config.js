var browsers = [{
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '8'
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9'
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '10'
  }, {
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
    browserName: 'safari',
    version: '6',
    platform: 'OSX 10.8'
  }, {
    browserName: 'safari',
    version: '7',
    platform: 'OSX 10.9'
  }, {
    browserName: 'safari',
    version: '8',
    platform: 'OSX 10.10'
  }, {
    browserName: 'firefox',
    version: '36',
    platform: 'OSX 10.10'
  }, {
    browserName: 'firefox',
    version: '35',
    platform: 'OSX 10.10'
  }, {
    browserName: 'firefox',
    version: '34',
    platform: 'OSX 10.10'
  }].concat(
    [{
      platformVersion: '8.1',
      deviceName: 'iPhone Simulator'
    }, {
      platformVersion: '8.1',
      deviceName: 'iPad Simulator'
    }, {
      platformVersion: '7.1',
      deviceName: 'iPhone Simulator'
    }, {
      platformVersion: '7.1',
      deviceName: 'iPad Simulator'
    }, {
      platformVersion: '6.1',
      deviceName: 'iPhone Simulator'
    }, {
      platformVersion: '6.1',
      deviceName: 'iPad Simulator'
    }].map(function(e) {
      e.appiumVersion = '1.3.7';
      e.browserName = 'safari';
      e.platformName = 'iOS';
      e.nativeWebTap = true;
      return e;
    }))
  .map(function(e) {
    e.name = e.browserName + '-' + (e.version || e.platformVersion) + '-' + (e.platform || e.deviceName);
    e.build = process.env.TRAVIS_BUILD_NUMBER || 'local';
    e['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER || 'local';
    return e;
  });

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  maxSessions: 3,

  multiCapabilities: browsers,

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 180000,
    isVerbose: true
  }
};
