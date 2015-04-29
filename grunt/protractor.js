module.exports = function(grunt) {
  return {
    options: {
      args: {
        baseUrl: 'http://<%= page_hostname %>:' + (grunt.option('port') || 8080) + '/',
        specs: ['dist/specs.js']
      }
    },
    browsers: {
      options: {
        configFile: 'test/browsers.config.js'
      }
    },
    devices: {
      options: {
        configFile: 'test/devices.config.js'
      }
    },
    sauce: {
      options: {
        configFile: 'test/saucelabs.config.js'
      }
    }
  };
};
