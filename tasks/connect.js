var externalIp = require('./externalIp.js');

module.exports = function(grunt) {
  grunt.config('connect', {
    server: {
      options: {
        hostname: externalIp,
        port: 8080,
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
};
