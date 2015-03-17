module.exports = function(grunt) {
  grunt.config('jshint', {
    src: ['test/**/*.js']
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
}
