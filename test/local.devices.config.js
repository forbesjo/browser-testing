exports.config = {

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
      // deviceName: '10.1.11.209:5555' // MOBILE367 on BRIGHTCOVE WIFI
      deviceName: 'ZX1G22CFRQ' // MOBILE367 by USB
    }

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

    // , {
    //   browserName: '',
    //   platformName: 'iOS',
    //   platformVersion: '8.1',
    //   udid: '79431df8dc364454f4850ceacb447797bc313574',
    //   deviceName: 'MOBILE152',
    //   bundleId: 'com.brightcove.WebViewApp',
    //   newCommandTimeout: 60
    // }
  ],

  onPrepare: function() {
    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
    wdBridge.initFromProtractor(exports.config);
  }

};
