exports.config = {
  maxSessions: 1,

  seleniumAddress: 'http://localhost:4723/wd/hub',

  multiCapabilities: [
    // // TODO: Setup these devices
    // {
    //   browserName: 'safari',
    //   platformName: 'iOS',
    //   platformVersion: '7',
    //   udid: '',
    //   deviceName: ''
    // }, {
    //   browserName: 'safari',
    //   platformName: 'iOS',
    //   platformVersion: '7.1.2',
    //   udid: '',
    //   deviceName: ''
    // }, {
    //   browserName: 'Chrome',
    //   platformName: 'Android',
    //   platformVersion: '4.0',
    //   deviceName: ''
    // }, {
    //   browserName: 'Chrome',
    //   platformName: 'Android',
    //   platformVersion: '4.1',
    //   deviceName: ''
    // }, {
    //   browserName: 'Chrome',
    //   platformName: 'Android',
    //   platformVersion: '4.3',
    //   deviceName: ''
    // }

    {
      browserName: 'chrome',
      platformName: 'Android',
      platformVersion: '5.0',
      // deviceName: '10.1.10.119:5555' // MOBILE281 on BRIGHTCOVE WIFI
      deviceName: '06706cfb0063bfef', // MOBILE281 by USB
      newCommandTimeout: 60
    },

    // , {
    //   browserName: 'Chrome',
    //   platformName: 'Android',
    //   platformVersion: '4.2.2',
    //   deviceName: '10.1.12.87:5555' // MOBILE367 on BRIGHTCOVE WIFI
    // }

    // , {
    //   browserName: 'Chrome',
    //   platformName: 'Android',
    //   platformVersion: '4.4.2',
    //   deviceName: '10.1.13.41:5555' // MOBILE367 on BRIGHTCOVE WIFI
    // }

    // {
    //   browserName: 'safari',
    //   platformName: 'iOS',
    //   platformVersion: '8.2',
    //   // udid: '79431df8dc364454f4850ceacb447797bc313574',
    //   // deviceName: 'MOBILE152',
    //   deviceName: 'iPhone 4s',
    //   nativeWebTap: true,
    //   newCommandTimeout: 60
    // },
    // {
    //   browserName: 'safari',
    //   platformName: 'iOS',
    //   platformVersion: '8.2',
    //   // udid: '79431df8dc364454f4850ceacb447797bc313574',
    //   // deviceName: 'MOBILE152',
    //   deviceName: 'iPad Retina',
    //   nativeWebTap: true,
    //   newCommandTimeout: 60
    // }
    //
    {
      app: process.env.PWD + '/SafariLauncher.zip',
      browserName: '',
      // browserName: 'safari',
      // bundleId: 'com.brightcove.SafariLauncher',
      platformName: 'iOS',
      deviceName: 'MOBILE152',
      udid: '79431df8dc364454f4850ceacb447797bc313574',
      safariAllowPopups: false,
      safariIgnoreFraudWarning: true,
      newCommandTimeout: 60
    }
  ],

  onPrepare: function() {
    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
    wdBridge.initFromProtractor(exports.config);

    browser.ignoreSynchronization = true;
  }

};
