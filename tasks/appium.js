module.exports = function(grunt) {
  grunt.registerTask('appium', function() {
    grunt.util.spawn({
      cmd: 'node_modules/.bin/appium',
      opts: {
        stdio: ['ignore', 'ignore', process.stderr]
      }
    }, function(error) {
      if (error) {
        grunt.log.ok('Appium is already running...');
      }
    });
  });
};
