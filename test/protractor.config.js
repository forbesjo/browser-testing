var netInterfaces = require('os').networkInterfaces(),
  externalIps = Object.keys(netInterfaces)
  .reduce(function(result, iface) {
    return result.concat(netInterfaces[iface]);
  }, [])
  .filter(function(iface) {
    return iface.family === 'IPv4' && !iface.internal;
  }),
  externalIp = externalIps[externalIps.length - 1].address,
  config = {};

if (process.env.SAUCE_USERNAME) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.maxSessions = 3;
  config.maxDuration = 300;

  config.multiCapabilities = [{
    //   browserName: 'internet explorer',
    //   platform: 'Windows 7',
    //   version: '8'
    // }, {
    //   browserName: 'internet explorer',
    //   platform: 'Windows 7',
    //   version: '9'
    // }, {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '10'
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  }, {
    browserName: 'chrome',
    version: '41',
    platform: 'Windows 8.1'
  }, {
    browserName: 'chrome',
    platform: 'Windows 8.1'
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
    platform: 'Windows 8.1',
    loggingPrefs: {
      browser: 'SEVERE'
    }
  }, {
    browserName: 'firefox',
    version: '35',
    platform: 'Windows 8.1',
    loggingPrefs: {
      browser: 'SEVERE'
    }
  }, {
    browserName: 'firefox',
    platform: 'Windows 8.1',
    loggingPrefs: {
      browser: 'SEVERE'
    }
  }].map(function(browser) {
    browser.name = browser.browserName + '-' + browser.version + '-' + browser.platform;
    browser.build = process.env.TRAVIS_BUILD_NUMBER || (process.env.SAUCE_USERNAME + '-local-' + Date.now());
    browser['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER || 'local';
    return browser;
  });
} else if (process.env.WEBDRIVER_SERVER) {
  config.seleniumAddress = 'http://' + process.env.WEBDRIVER_SERVER + ':4444/wd/hub';
} else {
  config.capabilities = {
    browserName: 'chrome',
    chromeOptions: {
      // http://peter.sh/experiments/chromium-command-line-switches/
      args: [
        // Disables installation of default apps on first run. This is used during automated testing.
        'disable-default-apps',
        // Disables default browser checking
        'no-default-browser-check',
        // Skip First Run tasks
        'no-first-run',
        // Disables the sandbox for all process types that are normally sandboxed.
        'no-sandbox',
        // Disables extensions
        'disable-extensions'
      ]
    }
  };
}

config.specs = ['spec/player.test.js'];

config.framework = 'jasmine2';
config.jasmineNodeOpts = {
  showColors: true,
  // Time(ms) it takes for a single 'it' test to complete
  defaultTimeoutInterval: 60000
};

config.onPrepare = function() {
  browser.ignoreSynchronization = true;

  return browser.getCapabilities().then(function(caps) {
    browser.name = caps.get('browserName') + '-' + (caps.get('version') || 'latest') + '-' + caps.get('platform');
    browser.browserName = caps.get('browserName');
    browser.platform = caps.get('platform');
  });
};

config.baseUrl = 'http://' + externalIp + ':9999/';

exports.config = config;
