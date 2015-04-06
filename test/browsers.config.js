exports.config = {
  multiCapabilities: [{
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
    },

    {
      browserName: 'safari'
    },

    {
      browserName: 'firefox',
      loggingPrefs: {
        browser: 'SEVERE'
      }
    }
  ],

  framework: 'jasmine2',

  onPrepare: function() {
    browser.ignoreSynchronization = true;
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter());
  },

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 180000
  }
};
