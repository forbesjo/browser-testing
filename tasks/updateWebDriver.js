module.exports = function(grunt) {
  grunt.registerTask('updateWebDriver', function() {
    grunt.util.spawn({
      cmd: 'node_modules/.bin/webdriver-manager',
      args: ['update'],
      opts: {
        stdio: 'inherit'
      }
    }, this.async());
  });
};
