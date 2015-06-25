module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    watch: {
      test: {
        files: './test/e2e/*.js',
        tasks: ['test']
      }
    },
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
      options: {
        esnext: true
      },
      files: {
        src: ['./**/*.js', '!./node_modules/**/*.js', '!./dist/**/*.js']
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
    },
    browserify: {
      options: {
        transform: ['babelify']
      },
      test: {
        files: {
          'dist/specs.js': ['test/**/*.test.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.registerTask('test', function() {
    if (process.env.TRAVIS && process.env.TRAVIS_PULL_REQUEST !== 'false') {
      grunt.task.run('jshint');
    } else {
      grunt.task.run(['jshint', 'browserify', 'connect', 'protractor:test']);
    }
  });

  grunt.registerTask('default', 'test');
};
