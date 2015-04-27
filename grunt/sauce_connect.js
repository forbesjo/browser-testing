module.exports = {
  test: {
    options: {
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER || 'local'
    }
  }
};
