require('shelljs/global');

module.exports = function(grunt) {
  grunt.registerTask('appium', function() {
    exec('node_modules/.bin/appium');
  });

  grunt.registerTask('appiumDoctor', function() {
    exec('node_modules/.bin/appium-doctor');
  });

  grunt.registerTask('checkBrowsers', function() {
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
  });

  grunt.registerTask('proxyDevice', function(udid) {
    exec('node_modules/appium/bin/ios-webkit-debug-proxy-launcher.js -c ' + udid + ':27753');
  });

  grunt.registerTask('updateWebDriver', function() {
    exec('node_modules/.bin/webdriver-manager update');
  });

  grunt.registerTask('connectAndroid', function() {
    exec('adb devices');
  });

  return {
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

    'remote' : ['test-setup', 'protractor:browsers'],

    'local': [
      'test-setup',
      'local-browsers'
        // , 'local-devices'
    ],

    'test-picker': (process.env.SAUCE_USERNAME && 'sauce') || (process.env.WEBDRIVER_SERVER && 'remote') || 'local',

    'test': process.env.TRAVIS_PULL_REQUEST !== 'true' ? 'test-picker' : 'jshint',

    'default': 'test'
  };
};
