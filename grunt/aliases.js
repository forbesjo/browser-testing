module.exports = function(grunt) {
  grunt.registerTask('appium', function() {
    grunt.util.spawn({
      cmd: 'node_modules/.bin/appium',
      opts: {
        stdio: ['ignore', 'ignore', process.stderr]
      }
    }, function(error) {
      if (error) {
        grunt.log.ok('Appium is already running...');
      }
    });
  });

  grunt.registerTask('appiumDoctor', function() {
    grunt.util.spawn({
      cmd: 'node_modules/.bin/appium-doctor',
      opts: {
        stdio: 'inherit'
      }
    }, this.async());
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
    grunt.util.spawn({
      cmd: 'node_modules/appium/bin/ios-webkit-debug-proxy-launcher.js',
      args: ['-c ' + udid + ':27753'],
      opts: {
        stdio: 'inherit'
      }
    });
  });

  grunt.registerTask('updateWebDriver', function() {
    grunt.util.spawn({
      cmd: 'node_modules/.bin/webdriver-manager',
      args: ['update'],
      opts: {
        stdio: 'inherit'
      }
    }, this.async());
  });

  grunt.registerTask('connectAndroid', function() {
    grunt.util.spawn({
      cmd: 'adb',
      args: ['devices'],
      opts: {
        stdio: 'inherit'
      }
    }, this.async());
  });

  return {
    'setup-browsers': [
      'checkBrowsers',
      'updateWebDriver',
      'protractor_webdriver:start'
    ],

    'setup-appium': [
      'appiumDoctor',
      'copy',
      'appium',
      'proxyDevice:79431df8dc364454f4850ceacb447797bc313574', //Mobile152
      'connectAndroid'
    ],

    'setup-env': ['setup-browsers', 'setup-appium'],

    'sauce': ['sauce_connect', 'protractor:sauce', 'sauce-connect-close'],

    'local-browsers': ['setup-browsers', 'protractor:browsers'],

    'local-devices': ['setup-appium', 'protractor:devices'],

    'test': [
      'jshint',
      'browserify',
      'connect',
      (process.env.SAUCE_USERNAME ? 'sauce' : ((process.env.CI || process.env.WEBDRIVER_SERVER) ? 'concurrent:all' : 'local-browsers'))
    ]
  };
};
