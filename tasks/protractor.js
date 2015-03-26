var externalIp = require('./externalIp.js');

module.exports = function(grunt) {
  grunt.config('protractor', {
    options: {
      noColor: false,
      args: {
        baseUrl: 'http://' + externalIp + ':8080/',
        specs: ['test/spec/player.test.js']
      }
    },
    localDesktop: {
      options: {
        configFile: 'test/local.desktop.config.js'
      }
    },
    localDevices: {
      options: {
        configFile: 'test/local.devices.config.js'
      }
    },
    sauce: {
      options: {
        configFile: 'test/sauce.config.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-protractor-runner');
};
