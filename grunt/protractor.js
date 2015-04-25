module.exports = {
  options: {
    args: {
      baseUrl: 'http://<%= page_hostname %>:8000/',
      specs: ['dist/specs.js']
    }
  },
  browsers: {
    options: {
      configFile: 'test/browsers.config.js'
    }
  },
  devices: {
    options: {
      configFile: 'test/devices.config.js'
    }
  },
  sauce: {
    options: {
      configFile: 'test/saucelabs.config.js'
    }
  }
};
