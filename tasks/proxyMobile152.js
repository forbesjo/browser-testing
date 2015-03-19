module.exports = function(grunt) {
  grunt.registerTask('proxyMobile152', function() {
    grunt.util.spawn({
      cmd: 'node_modules/appium/bin/ios-webkit-debug-proxy-launcher.js',
      args: ['-c 79431df8dc364454f4850ceacb447797bc313574:27753'],
      opts: {
        stdio: 'inherit'
      }
    });
  });
};
