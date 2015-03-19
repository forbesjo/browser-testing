module.exports = function(grunt) {
  grunt.registerTask('appiumDoctor', function() {
    grunt.util.spawn({
      cmd: 'node_modules/.bin/appium-doctor',
      opts: {
        stdio: 'inherit'
      }
    }, this.async());
  });
};
