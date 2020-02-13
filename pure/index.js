'use strict';

var proxiesSet = new WeakSet();
var GlobalProxy = Proxy;

exports.Proxy = function(target, handler) {
  var proxy = new GlobalProxy(target, handler);
  proxiesSet.add(proxy);
  return proxy;
};

exports.Proxy.revocable = function(target, handler) {
  var proxyObj = GlobalProxy.revocable(target, handler);
  proxiesSet.add(proxyObj.proxy);
  return proxyObj;
};

/**
 * Checks whether a value is a proxy object
 *
 * @param {*} o
 * @returns {boolean} a boolean, true if value is a proxy object, false if it is not
 */
exports.isProxy = function isProxy(o) {
  return proxiesSet.has(o);
};
