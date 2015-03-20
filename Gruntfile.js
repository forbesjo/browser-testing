module.exports = function(grunt) {
  'use strict';

  grunt.loadTasks('tasks');

  grunt.registerTask('setup', ['checkBrowsers', 'appiumDoctor', 'updateWebDriver']);

  grunt.registerTask('localSerial', [
    'protractor:localDesktop'
    // , 'protractor:localDevices' // TODO: make devices stable
  ]);

  grunt.registerTask('start-device-server', [
    'appium',
    'proxyDevice:79431df8dc364454f4850ceacb447797bc313574' //Mobile152]
  ]);
  grunt.registerTask('e2e-test', ['connect', (process.env.JENKINS ? 'concurrent:ci' : 'localSerial')]);

  // TODO: setup Jenkins, find real env variable
  grunt.registerTask('test', [
    'setup',
    'jshint',
    'clean',
    'copy',
    'start-device-server',
    'e2e-test'
  ]);
};
