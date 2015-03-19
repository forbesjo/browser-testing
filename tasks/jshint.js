module.exports = function(grunt) {
  grunt.config('jshint', {
    src: ['./**/*.js', '!./node_modules/**/*.js', '!./test/tmp/*.js']
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
};
