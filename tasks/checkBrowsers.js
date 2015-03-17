module.exports = function(grunt) {
  grunt.registerTask('checkBrowsers', function() {
    var browserComponents = [
        '/Applications/Google Chrome.app',
        '/Applications/Firefox.app',
        '/Applications/Safari.app',
        process.env['HOME'] + '/Library/Safari/Extensions/WebDriver.safariextz'
      ],
      i = 0,
      browserComponent;

    for (; i < browserComponents.length; i++) {
      browserComponent = browserComponents[i];
      if (grunt.file.exists(browserComponent)) {
        grunt.log.ok(browserComponent + ' is present');
      } else {
        grunt.fail.warn(browserComponent + ' is NOT present');
      }
    }
  });
}
