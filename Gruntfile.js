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
        command: 'node_modules/.bin/appium',
        options: {
          async: true,
          stdout: false,
          failOnError: false
        }
      },
      appiumDoctor: {
        command: 'node_modules/.bin/appium-doctor'
      },
      webdriverManager: {
        command: 'node_modules/.bin/webdriver-manager update'
      },
      adbDevices: {
        command: 'adb devices'
      },
      proxyiPhone: {
        command: 'node_modules/appium/bin/ios-webkit-debug-proxy-launcher.js -c 79431df8dc364454f4850ceacb447797bc313574:27753 -d',
        options: {
          async: true,
          stdout: false,
          failOnError: false
        }
      }
    },

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
          configFile: 'test/local.devices.config.js'
        }
      },
      sauce: {
        options: {
          configFile: 'test/sauce.config.js'
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
    'setup',
    'jshint',
    'clean',
    'assemble',
    'shell:appium',
    'shell:adbDevices',
    'shell:proxyiPhone',
    'connect', (process.env.JENKINS ? 'concurrent:ci' : 'concurrent:local'),
    'shell:appium:kill'
  ]);
};
