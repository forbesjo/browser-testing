module.exports = {
  options: {
    transform: ['babelify']
  },
  test: {
    files: {
      'dist/specs.js': ['test/**/*.test.js']
    }
  }
};
