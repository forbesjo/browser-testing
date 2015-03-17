var netInterfaces = require('os').networkInterfaces();

module.exports = Object.keys(netInterfaces).reduce(function(result, iface) {
  return result.concat(netInterfaces[iface]);
}, []).filter(function(iface) {
  return iface.family === 'IPv4' && !iface.internal;
})[0].address;
