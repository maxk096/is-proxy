'use strict';

var proxiesSet = new WeakSet();
var GlobalProxy = Proxy;

exports.Proxy = new GlobalProxy(GlobalProxy, {
  construct(target, args) {
    var proxy = Reflect.construct(target, args);
    proxiesSet.add(proxy);
    return proxy;
  }
});

exports.Proxy.revocable = new GlobalProxy(GlobalProxy.revocable, {
  apply(target, thisArg, argumentsList) {
    var proxyObj = Reflect.apply(target, thisArg, argumentsList);
    proxiesSet.add(proxyObj.proxy);
    return proxyObj;  
  }
});

/**
 * Checks whether a value is a proxy object
 *
 * @param {*} o
 * @returns {boolean} a boolean, true if value is a proxy object, false if it is not
 */
exports.isProxy = function isProxy(o) {
  return proxiesSet.has(o);
};
