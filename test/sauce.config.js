exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  multiCapabilities: [{
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '8'
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9'
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '10'
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '11'
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 11',
    version: '11'
  }, {
    browserName: 'chrome',
    version: '41.0.2272'
  }, {
    browserName: 'chrome',
    version: '40.0.2214'
  }, {
    browserName: 'safari',
    version: '6.2.3'
  }, {
    browserName: 'safari',
    version: '7.1.3'
  }, {
    browserName: 'safari',
    version: '8.0.3'
  }, {
    browserName: 'firefox',
    version: '36'
  }, {
    browserName: 'firefox',
    version: '35'
  }, {
    browserName: 'firefox',
    version: '34'
  }]
};
