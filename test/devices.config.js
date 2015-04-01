// TODO: get some devices to keep on the automation machine

var iosDevices = [

  {
    deviceName: 'MOBILE163',
    udid: 'be01ecce333783c4b12fafb68092cf0554019912',
    platformVersion: '7.1',
    type: 'tablet'
  }

  // {
  //   deviceName: 'MOBILE152',
  //   udid: '79431df8dc364454f4850ceacb447797bc313574',
  //   platformVersion: '8.1',
  //   type: 'phone'
  // }

  // , {
  //   deviceName: '',
  //   platformVersion: '7.1',
  //   udid: '',
  //   type: 'phone'
  // }, {
  //   deviceName: '',
  //   platformVersion: '8.2',
  //   udid: '',
  //   type: 'phone'
  // }

].map(function(e) {
  e.browserName = 'safari';
  e.platformName = 'iOS';
  e.safariAllowPopups = false;
  e.safariIgnoreFraudWarning = true;
  e.newCommandTimeout = 60;
  return e;
});

var androidDevices = [
  // {
  //   platformVersion: '4.0',
  //   deviceName: ''
  // }, {
  //   platformVersion: '4.1',
  //   deviceName: ''
  // }, {
  //   platformVersion: '4.2',
  //   deviceName: ''
  // }, {
  //   platformVersion: '4.3',
  //   deviceName: ''
  // },


  // // Works
  // {
  //   bcName: 'MOBILE323',
  //   deviceName: '0793a6d0',
  //   version: '5.0.1'
  // }
  //
  // // Works
  {
    bcName: 'MOBILE335',
    deviceName: '320426a40df911a9',
    version: '4.4'
  }

  // // Works
  // {
  //   bcName: 'MOBILE181',
  //   deviceName: '4df712f000d1cf81',
  //   version: '4.4.2'
  // }

].map(function(e) {
  return {
    browserName: 'chrome',
    platformName: 'android',
    platformVersion: e.version,
    deviceName: e.deviceName,
    newCommandTimeout: 60
  };
});

// var devices = iosDevices.concat(androidDevices);
var devices = androidDevices;

exports.config = {
  maxSessions: 1,

  seleniumAddress: 'http://' + (process.env.WEBDRIVER_SERVER || 'localhost') + ':4723/wd/hub',

  multiCapabilities: devices,

  onPrepare: function() {
    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
    wdBridge.initFromProtractor(exports.config);

    browser.ignoreSynchronization = true;
  }

};
