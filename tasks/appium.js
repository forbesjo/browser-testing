module.exports = function(grunt) {
  grunt.registerTask('appium', function() {
    grunt.util.spawn({
      cmd: 'node_modules/.bin/appium',
      opts: {
        stdio: 'inherit'
      }
    }, function(error) {
      if (error) {
        grunt.log.ok('Appium is already running...');
      }
    });
  });
};
