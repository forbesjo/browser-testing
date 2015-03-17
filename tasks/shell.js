module.exports = function(grunt) {
  grunt.config('shell', {
    options: {
      stdout: true
    },
    appium: {
      command: 'node_modules/.bin/appium',
      options: {
        async: true,
        stdout: false,
        stderr: false,
        failOnError: false
      }
    },
    appiumDoctor: {
      command: 'node_modules/.bin/appium-doctor'
    },
    webdriverManager: {
      command: 'node_modules/.bin/webdriver-manager update'
    },
    proxyMobile152: {
      command: 'node_modules/appium/bin/ios-webkit-debug-proxy-launcher.js -c 79431df8dc364454f4850ceacb447797bc313574:27753',
      options: {
        async: true,
        stdout: false,
        failOnError: false
      }
    }
  });
  grunt.loadNpmTasks('grunt-shell-spawn');
};
