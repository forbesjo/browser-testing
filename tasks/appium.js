module.exports = function(grunt) {
  grunt.registerTask('appium', function() {
    var done = this.async();
    grunt.util.spawn({
      cmd: 'node_modules/.bin/appium',
      opts: {
        stdio: 'inherit'
      }
    }, function(){
      done();
    });
  });
};
