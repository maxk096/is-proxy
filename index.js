'use strict';

(function(scope) {
  var pure = require('./pure');
  scope.Proxy = pure.Proxy;
  exports.isProxy = pure.isProxy;
})(
  (typeof process !== 'undefined' &&
    {}.toString.call(process) === '[object process]') ||
    (typeof navigator !== 'undefined' && navigator.product === 'ReactNative')
    ? global
    : self
);
