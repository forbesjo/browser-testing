module.exports = function(grunt) {
  grunt.config('copy', {
    main: {
      src: 'SafariLauncher.zip',
      dest: 'node_modules/appium/build/SafariLauncher/SafariLauncher.zip'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
