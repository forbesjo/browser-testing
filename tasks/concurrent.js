module.exports = function(grunt) {
  grunt.config('concurrent', {
    local: [
      'protractor:localDesktop',
      'protractor:localDevices'
    ],
    ci: [
      'protractor:sauce',
      'protractor:localDevices'
    ]
  });
  grunt.loadNpmTasks('grunt-concurrent');
};
