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

  return {
    'testLocalDesktop': [
      'checkBrowsers',
      'updateWebDriver',
      'protractor:local'
    ],

    'testLocalDevices': [
      'appiumDoctor',
      'copy',
      'appium',
      'proxyDevice:79431df8dc364454f4850ceacb447797bc313574' //Mobile152
      // 'protractor:devices'
    ],

    'test': [
      'jshint',
      'connect',
      (process.env.TRAVIS ? 'protractor:sauce' : 'testLocalDesktop')
    ]
  };
};
