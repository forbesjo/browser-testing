module.exports = function(grunt) {
  'use strict';

  grunt.loadTasks('tasks');

  grunt.registerTask('setup', ['checkBrowsers', 'appiumDoctor', 'updateWebDriver']);

  grunt.registerTask('start-device-server', [
    'appium',
    'proxyDevice:79431df8dc364454f4850ceacb447797bc313574' //Mobile152]
  ]);

  grunt.registerTask('test', function() {
    if (process.env.TRAVIS) {
      grunt.task.run([
        'jshint',
        'clean',
        'copy',
        'connect',
        'protractor:sauce'
      ]);
    } else {
      grunt.task.run([
        'setup',
        'jshint',
        'clean',
        'copy',
        'connect',
        'protractor:localDesktop'
        // ,'start-device-server',
        // 'protractor:localDevices'
      ]);
    }
  });
};
