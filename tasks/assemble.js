module.exports = function(grunt) {
  grunt.config('assemble', {
    site: {
      files: {
        'test/tmp/player-test.html': ['test/templates/in-page-embed.hbs']
      }
    }
  });

  grunt.loadNpmTasks('assemble');
}
