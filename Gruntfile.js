module.exports = function(grunt) {
  'use strict';

  grunt.loadTasks('tasks');

  grunt.registerTask('testLocalDesktop', [
    'checkBrowsers',
    'updateWebDriver',
    'protractor:localDesktop'
  ]);

  grunt.registerTask('testLocalDevices', [
    'appiumDoctor',
    'appium',
    'proxyDevice:79431df8dc364454f4850ceacb447797bc313574' //Mobile152
    // 'protractor:localDevices'
  ]);

  grunt.registerTask('test', function() {
    grunt.task.run([
      'jshint',
      'clean',
      'copy',
      'connect',
      (process.env.TRAVIS ? 'protractor:sauce' : 'testLocalDesktop')
    ]);
  });
};
