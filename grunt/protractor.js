module.exports = {
  options: {
    args: {
      baseUrl: 'http://<%= externalIp %>:8080/',
      specs: ['dist/specs.js']
    }
  },
  browsers: {
    options: {
      configFile: 'test/browsers.config.js',
      args: {
        seleniumAddress: 'http://<%= webdriver_server %>:4444/wd/hub',
        baseUrl: 'http://<%= externalIp %>:8080/',
        specs: ['dist/specs.js']
      }
    }
  },
  devices: {
    options: {
      configFile: 'test/devices.config.js',
      args: {
        seleniumAddress: 'http://<%= webdriver_server %>:4723/wd/hub',
        baseUrl: 'http://<%= externalIp %>:8080/',
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
