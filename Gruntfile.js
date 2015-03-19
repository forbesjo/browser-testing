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
    'proxyMobile152',
    'connect',
    (process.env.JENKINS ? 'concurrent:ci' : 'localSerial')
  ]);
};
