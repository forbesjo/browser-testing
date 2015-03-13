var netInterfaces = require('os').networkInterfaces(),
  externalIp = Object.keys(netInterfaces).reduce(function(result, iface) {
    return result.concat(netInterfaces[iface]);
  }, []).filter(function(iface) {
    return iface.family === 'IPv4' && !iface.internal;
  })[0];

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      src: ['test/**/*.js']
    },

    clean: ['test/tmp'],

    connect: {
      server: {
        options: {
          hostname: externalIp.address,
          port: 8080,
          base: 'test/tmp'
        }
      }
    },

    assemble: {
      site: {
        files: {
          'test/tmp/player-test.html': ['test/templates/in-page-embed.hbs']
        }
      }
    },

    shell: {
      options: {
        stdout: true
      },
      appium: {
        command: 'node_modules/.bin/appium --port 4723',
        options: {
          async: true,
          stdout: false,
          failOnError: false
        }
      },
      appiumDoctor: {
        command: 'node_modules/.bin/appium-doctor',
      },
      webdriverManager: {
        command: 'node_modules/grunt-protractor-runner/node_modules/.bin/webdriver-manager update',
      },
      adbDevices: {
        command: 'adb devices'
      }
    },

    // TODO: duplicate code
    protractor: {
      options: {
        keepAlive: true,
        noColor: false,
        args: {
          baseUrl: 'http://' + externalIp.address + ':8080/',
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
          configFile: 'test/local.devices.config.js',
          args: {
            // Device testing uses a running Appium instance,
            // by default it starts on port 4723
            // See https://github.com/angular/protractor/issues/361
            seleniumAddress: 'http://' + externalIp.address + ':4723/wd/hub',
            baseUrl: 'http://' + externalIp.address + ':8080/',
            specs: ['test/spec/player.test.js']
          }
        }
      },

      sauce: {
        options: {
          configFile: 'test/sauce.config.js',
          args: {
            sauceUser: process.env.SAUCE_USERNAME,
            sauceKey: process.env.SAUCE_ACCESS_KEY,
            baseUrl: 'http://' + externalIp.address + ':8080/',
            specs: ['test/spec/player.test.js']
          }
        }
      }
    },

    concurrent: {
      local: [
        'protractor:localDesktop'
        // TODO: make devices stable
        // ,
        // 'protractor:localDevices'
      ],
      ci: [
        'protractor:sauce',
        'protractor:localDevices'
      ]
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-shell-spawn');

  grunt.registerTask('setup', function() {
    var browserComponents = [
        [grunt.file.isDir('/Applications/Google Chrome.app'), 'Chrome is installed'],
        [grunt.file.isDir('/Applications/Firefox.app'), 'Firefox is installed'],
        [grunt.file.isDir('/Applications/Safari.app'), 'Safari is installed'],
        [grunt.file.isFile(process.env['HOME'] + '/Library/Safari/Extensions/WebDriver.safariextz'), 'SafariDriver extension is installed']
      ],
      i = 0;

    grunt.task.run('shell:appiumDoctor');
    grunt.task.run('shell:webdriverManager');

    for (; i < browserComponents.length; i++) {
      (browserComponents[i][0] ? grunt.log.ok : grunt.log.error)(browserComponents[i][1]);
    }
  });

  // TODO: setup Jenkins, find real env variable
  grunt.registerTask('test', [
    'jshint',
    'clean',
    'assemble',
    'shell:appium',
    'shell:adbDevices',
    'connect', (process.env.JENKINS ? 'concurrent:ci' : 'concurrent:local'),
    'shell:appium:kill'
  ]);
};
