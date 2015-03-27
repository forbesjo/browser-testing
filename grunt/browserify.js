module.exports = {
  options: {
    transform: ['babelify']
  },
  test: {
    files: {
      'dist/specs.js': ['test/**/*_spec.js']
    }
  }
};
