module.exports = function(grunt) {
  'use strict';

  var netInterfaces = require('os').networkInterfaces(),
    externalIps = Object.keys(netInterfaces)
    .reduce(function(result, iface) {
      return result.concat(netInterfaces[iface]);
    }, [])
    .filter(function(iface) {
      return iface.family === 'IPv4' && !iface.internal;
    }),
    externalIp = externalIps[externalIps.length - 1].address;

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);
  require('load-grunt-config')(grunt, {
    data: {
      externalIp: externalIp,
      webdriver_server: process.env.WEBDRIVER_SERVER || externalIp
    }
  });
};
