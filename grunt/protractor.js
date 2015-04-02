module.exports = {
  options: {
    args: {
      baseUrl: 'http://<%= page_hostname %>:8080/',
      specs: ['dist/specs.js']
    }
  },
  browsers: {
    options: {
      configFile: 'test/browsers.config.js',
      args: {
        seleniumAddress: 'http://<%= webdriver_server %>:4444/wd/hub',
        baseUrl: 'http://<%= page_hostname %>:8080/',
        specs: ['dist/specs.js']
      }
    }
  },
  devices: {
    options: {
      configFile: 'test/devices.config.js',
      args: {
        baseUrl: 'http://<%= page_hostname %>:8080/',
        specs: ['dist/specs.js']
      }
    }
  },
  sauce: {
    options: {
      configFile: 'test/sauce.config.js'
    }
  }
};
