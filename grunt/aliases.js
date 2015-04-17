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
      process.env.HOME + '/Library/Safari/Extensions/WebDriver.safariextz'
    ].map(function(browserComponent) {
      return grunt.file.exists(browserComponent) ?
        grunt.log.ok(browserComponent + ' is present') :
        grunt.fail.warn(browserComponent + ' is NOT present');
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

    'sauce': ['sauce_connect', 'protractor:sauce', 'sauce-connect-close'],

    'local-browsers': ['checkBrowsers', 'updateWebDriver', 'protractor:browsers'],

    'local-devices': ['setup-appium', 'protractor:devices'],

    'test': (process.env.TRAVIS_PULL_REQUEST !== 'true') ?
      [
        'jshint',
        'browserify',
        'connect',
        (process.env.SAUCE_USERNAME ?
          'sauce' :
          (process.env.WEBDRIVER_SERVER ?
            'protractor:browsers' :
            'local-browsers'))
      ] :
      ['jshint']
  };
};
