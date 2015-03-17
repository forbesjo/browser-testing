module.exports = function(grunt) {
  grunt.registerTask('checkBrowsers', function() {
    [
      '/Applications/Google Chrome.app',
      '/Applications/Firefox.app',
      '/Applications/Safari.app',
      process.env.HOME + '/Library/Safari/Extensions/WebDriver.safariextz'
    ].map(function(browserComponent) {
      return grunt.file.exists(browserComponent) ?
        grunt.log.ok(browserComponent + ' is present') :
        grunt.fail.warn(browserComponent + ' is NOT present');
    });
  });
};
