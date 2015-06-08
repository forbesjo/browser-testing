module.exports = function(grunt) {
  return {
    options: {
      args: {
        baseUrl: 'http://<%= page_hostname %>:' + (grunt.option('port') || 8080) + '/',
        specs: ['dist/specs.js'],
        jasmineNodeOpts: {
          showColors: true,
          // Time(ms) it takes for a single 'it' test to complete
          defaultTimeoutInterval: 60000
        },
        onPrepare: 'test/on-prepare.js',
        framework: 'jasmine2'
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
