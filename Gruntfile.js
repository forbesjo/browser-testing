module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    protractor: {
      options: {
        configFile: 'test/protractor.config.js'
      },
      test: {},
      devices: {
        options: {
          configFile: 'test/devices.config.js'
        }
      }
    },
    jshint: {
      files: {
        src: ['./**/*.js', '!./node_modules/**/*.js']
      }
    },
    copy: {
      main: {
        src: 'SafariLauncher.zip',
        dest: 'node_modules/appium/build/SafariLauncher/SafariLauncher.zip'
      }
    },
    connect: {
      server: {
        options: {
          port: 9999
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.registerTask('test', function() {
    if (process.env.TRAVIS && process.env.TRAVIS_PULL_REQUEST !== 'false') {
      grunt.task.run('jshint');
    } else {
      grunt.task.run(['jshint', 'connect', 'protractor:test']);
    }
  });

  grunt.registerTask('default', 'test');
};
