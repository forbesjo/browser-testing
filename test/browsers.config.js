var config = {};

if (process.env.TRAVIS) {
  config.multiCapabilities = [{
    browserName: 'chrome',
    chromeOptions: {
      args: ['no-sandbox']
    }
  }, {
    browserName: 'firefox',
    loggingPrefs: {
      browser: 'SEVERE'
    }
  }];
} else {
  config.multiCapabilities = [{
    browserName: 'chrome',
    chromeOptions: {
      // http://peter.sh/experiments/chromium-command-line-switches/
      args: [
        // Disables installation of default apps on first run. This is used during automated testing.
        'disable-default-apps',
        // Disables default browser checking
        'no-default-browser-check',
        // Skip First Run tasks
        'no-first-run',
        // Disables the sandbox for all process types that are normally sandboxed.
        'no-sandbox',
        // Disables extensions
        'disable-extensions'
      ]
    }
  }, {
    browserName: 'safari'
  }, {
    browserName: 'firefox',
    loggingPrefs: {
      browser: 'SEVERE'
    }
  }].filter(function(cap) {
    return process.env.BROWSER ? cap.browserName === process.env.BROWSER : true;
  });
}

if (process.env.WEBDRIVER_SERVER) {
  config.seleniumAddress = 'http://' + process.env.WEBDRIVER_SERVER + ':4444/wd/hub';
}

exports.config = config;
