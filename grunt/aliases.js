require('shelljs/global');

module.exports = function(grunt) {
  return {
    'proxyDevice': function(udid) {
      var done = this.async(),
        child = exec('node_modules/appium/bin/ios-webkit-debug-proxy-launcher.js-c' + udid + ':27753', {
          async: true
        });

      process.on('exit', function() {
        exec('kill ' + child.pid);
        done();
      });
    },

    'appium': function() {
      var appiumPath = require.resolve('appium'),
        done = this.async(),
        child = exec('node ' + appiumPath, {
          async: false
        });

      process.on('exit', function(data) {
        exec('kill ' + child.pid);
        done();
      });
    },

    'appiumDoctor': function() {
      exec('node_modules/.bin/appium-doctor');
    },

    'updateWebDriver': function() {
      exec('node_modules/.bin/webdriver-manager update');
    },

    'connectAndroid': function() {
      exec('adb devices');
    },

    'checkBrowsers': function() {
      [
        '/Applications/Google Chrome.app',
        '/Applications/Firefox.app',
        '/Applications/Safari.app',
        process.env.HOME + '/Library/Safari/Extensions/WebDriver*.safariextz'
      ].map(function(browserComponent) {
        if (ls(browserComponent).length > 0) {
          grunt.log.ok(browserComponent + ' is present');
        } else {
          grunt.fail.warn(browserComponent + ' is NOT present');
        }
      });
    },

    'setup-appium': [
      'appiumDoctor',
      'copy',
      'appium',
      'proxyDevice:79431df8dc364454f4850ceacb447797bc313574', //Mobile152
      'connectAndroid'
    ],

    'setup-env': ['setup-browsers', 'setup-appium'],

    'test-setup': [
      'jshint',
      'browserify',
      'connect'
    ],

    'sauce': ['test-setup', 'sauce_connect', 'protractor:sauce', 'sauce-connect-close'],

    'local-browsers': ['checkBrowsers', 'updateWebDriver', 'protractor:browsers'],

    'local-devices': ['setup-appium', 'protractor:devices'],

    'remote': ['test-setup', 'protractor:browsers'],

    'local': ['test-setup', 'local-browsers'],

    'test-picker': (process.env.SAUCE_USERNAME && 'sauce') || (process.env.WEBDRIVER_SERVER && 'remote') || 'local',

    'test': process.env.TRAVIS_PULL_REQUEST !== 'true' ? 'test-picker' : 'jshint',

    'default': 'test'
  };
};
