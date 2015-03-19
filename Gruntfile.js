module.exports = function(grunt) {
  'use strict';

  grunt.loadTasks('tasks');

  grunt.registerTask('setup', ['checkBrowsers', 'appiumDoctor', 'updateWebDriver']);

  grunt.registerTask('localSerial', [
    'protractor:localDesktop'
    // , 'protractor:localDevices' // TODO: make devices stable
  ]);

  // TODO: setup Jenkins, find real env variable
  grunt.registerTask('test', [
    'setup',
    'jshint',
    'clean',
    'assemble',
    'copy',
    'appium',
    'proxyDevice:79431df8dc364454f4850ceacb447797bc313574', //Mobile152
    'connect',
    (process.env.JENKINS ? 'concurrent:ci' : 'localSerial')
  ]);
};
