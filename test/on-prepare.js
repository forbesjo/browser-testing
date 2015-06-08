module.exports = function() {
  require('jasmine-bail-fast');
  browser.ignoreSynchronization = true;

  return browser.getCapabilities().then(function(caps) {
    browser.name = caps.get('browserName') + '-' + (caps.get('version') || 'latest') + '-' + caps.get('platform');
    browser.browserName = caps.get('browserName');
    browser.platform = caps.get('platform');
  });
};
