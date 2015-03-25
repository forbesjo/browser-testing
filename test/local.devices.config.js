var iosDevices = [{
  deviceName: 'MOBILE152',
  udid: '79431df8dc364454f4850ceacb447797bc313574',
  platformVersion: '8.1',
  type: 'phone'
}, {
  deviceName: '',
  platformVersion: '7.1',
  udid: '',
  type: 'phone'
}, {
  deviceName: '',
  platformVersion: '8.2',
  udid: '',
  type: 'phone'
}].map(function(e) {
  return {
    browserName: 'safari',
    platformName: 'iOS',
    platformVersion: e.version,
    udid: e.udid,
    deviceName: e.bcName,
    safariAllowPopups: false,
    safariIgnoreFraudWarning: true,
    newCommandTimeout: 60
  };
});

var androidDevices = [{
  platformVersion: '4.0',
  deviceName: ''
}, {
  platformVersion: '4.1',
  deviceName: ''
}, {
  platformVersion: '4.2',
  deviceName: ''
}, {
  platformVersion: '4.3',
  deviceName: ''
}, {
  bcName: 'MOBILE281',
  deviceName: '06706cfb0063bfef',
  version: '5.0.0'
}].map(function(e) {
  return {
    browserName: 'chrome',
    platformName: 'android',
    platformVersion: e.version,
    deviceName: e.name,
    newCommandTimeout: 60
  };
});

var devices = iosDevices.concat(androidDevices);

exports.config = {
  maxSessions: 1,

  seleniumAddress: 'http://localhost:4723/wd/hub',

  multiCapabilities: devices,

  onPrepare: function() {
    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
    wdBridge.initFromProtractor(exports.config);

    browser.ignoreSynchronization = true;
  }

};
