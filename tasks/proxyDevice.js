module.exports = function(grunt) {
  grunt.registerTask('proxyDevice', function(udid) {
    grunt.util.spawn({
      cmd: 'node_modules/appium/bin/ios-webkit-debug-proxy-launcher.js',
      args: ['-c ' + udid + ':27753'],
      opts: {
        stdio: 'inherit'
      }
    });
  });
};
