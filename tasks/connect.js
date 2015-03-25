var externalIp = require('./externalIp.js');

module.exports = function(grunt) {
  grunt.config('connect', {
    server: {
      options: {
        hostname: 'localhost',
        port: 8080,
        base: 'test/tmp'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
};
