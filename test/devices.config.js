// TODO: get some devices to keep on the automation machine
var netInterfaces = require('os').networkInterfaces(),
  externalIps = Object.keys(netInterfaces)
  .reduce(function(result, iface) {
    return result.concat(netInterfaces[iface]);
  }, [])
  .filter(function(iface) {
    return iface.family === 'IPv4' && !iface.internal;
  }),
  externalIp = externalIps[externalIps.length - 1].address;

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
  //   platformVersion: '5.0.1'
  // }
  //
  // // Works
  {
    bcName: 'MOBILE335',
    deviceName: '320426a40df911a9',
    platformVersion: '4.4'
  }

  // // Works
  // {
  //   bcName: 'MOBILE181',
  //   deviceName: '4df712f000d1cf81',
  //   platformVersion: '4.4.2'
  // }

].map(function(e) {
  e.browserName = 'chrome';
  e.platformName = 'android';
  e.newCommandTimeout = 60;
  return e;
});

// var devices = iosDevices.concat(androidDevices);
var devices = androidDevices;

exports.config = {
  maxSessions: 1,

  // WD Bridge requires Selenium Address to be defined here
  seleniumAddress: 'http://' + (process.env.WEBDRIVER_SERVER || 'localhost') + ':4723/wd/hub',

  multiCapabilities: devices,

  baseUrl: 'http://' + externalIp + ':9999/',
  specs: ['../dist/specs.js'],

  onPrepare: function() {
    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
    wdBridge.initFromProtractor(exports.config);

    browser.ignoreSynchronization = true;
  }
};
