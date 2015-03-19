module.exports = function(grunt) {
  grunt.config('copy', {
    main: {
      src: 'SafariLauncher.zip',
      dest: 'node_modules/appium/build/SafariLauncher/SafariLauncher.zip'
    },
    player: {
      src: 'test/templates/in-page-embed.hbs',
      dest: 'test/tmp/player-test.html',
      options: {
        process: function(content) {
          var embedPlayer = grunt.file.read('test/templates/players/in-page.embed');
          return content.replace('EMBED_PLAYER', embedPlayer);
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
