module.exports = function(grunt) {
  grunt.config('concurrent', {
    local: [
      'protractor:local',
      'protractor:devices'
    ],
    ci: [
      'protractor:sauce',
      'protractor:local'
    ]
  });
  grunt.loadNpmTasks('grunt-concurrent');
};
