var GlobalProxy = Proxy;

var testTraps = function(createProxy) {
  var has = jest.fn(Reflect.has);
  var get = jest.fn(Reflect.get);
  var set = jest.fn(Reflect.set);
  var getPrototypeOf = jest.fn(Reflect.getPrototypeOf);
  var setPrototypeOf = jest.fn(Reflect.setPrototypeOf);
  var isExtensible = jest.fn(Reflect.isExtensible);
  var preventExtensions = jest.fn(Reflect.preventExtensions);
  var getOwnPropertyDescriptor = jest.fn(Reflect.getOwnPropertyDescriptor);
  var defineProperty = jest.fn(Reflect.defineProperty);
  var deleteProperty = jest.fn(Reflect.deleteProperty);
  var ownKeys = jest.fn(Reflect.ownKeys);
  var apply = jest.fn(Reflect.apply);
  var construct = jest.fn(Reflect.construct);
  var traps = {
    has,
    get,
    set,
    getPrototypeOf,
    setPrototypeOf,
    defineProperty,
    isExtensible,
    preventExtensions,
    getOwnPropertyDescriptor,
    deleteProperty,
    ownKeys,
    apply,
    construct
  };
  var proxy = createProxy(traps);

  'abc' in proxy;
  expect(has).toHaveBeenCalled();
  proxy.abc;
  expect(get).toHaveBeenCalled();
  proxy.abc = 321;
  expect(set).toHaveBeenCalled();
  Object.getPrototypeOf(proxy);
  expect(getPrototypeOf).toHaveBeenCalled();
  Object.setPrototypeOf(proxy, Object.prototype);
  expect(setPrototypeOf).toHaveBeenCalled();
  Object.defineProperty(proxy, 'test', { value: '321' });
  expect(defineProperty).toHaveBeenCalled();
  Object.isExtensible(proxy);
  expect(isExtensible).toHaveBeenCalled();
  Object.preventExtensions(proxy);
  expect(preventExtensions).toHaveBeenCalled();
  Object.getOwnPropertyDescriptor(proxy, 'abc');
  expect(getOwnPropertyDescriptor).toHaveBeenCalled();
  Object.keys(proxy);
  expect(ownKeys).toHaveBeenCalled();
  new proxy();
  expect(construct).toHaveBeenCalled();
  proxy();
  expect(apply).toHaveBeenCalled();
};

var testWithProxiedValues = function(ProxyConstructor, isProxy) {
  var obj = { proxy: new ProxyConstructor({}, {}) };
  expect(isProxy(obj.proxy)).toBeTruthy();
  expect(isProxy(new ProxyConstructor({ abc: 1 }, {}))).toBeTruthy();
  expect(isProxy(new ProxyConstructor({}, {}))).toBeTruthy();
  expect(isProxy(ProxyConstructor.revocable({}, {}).proxy)).toBeTruthy();
  expect(isProxy(new ProxyConstructor([1, 2, 3], {}))).toBeTruthy();
  expect(isProxy(new ProxyConstructor(() => {}, {}))).toBeTruthy();
  expect(isProxy(new ProxyConstructor(function() {}, {}))).toBeTruthy();
  expect(
    isProxy(
      new ProxyConstructor(
        { g: '1' },
        {
          get(target, prop, receiver) {
            return Reflect.get(target, prop, receiver);
          }
        }
      )
    )
  ).toBeTruthy();
};

var testWithNotProxiedValues = function(isProxy) {
  expect(isProxy({ qwerty: 123 })).toBeFalsy();
  expect(isProxy(321)).toBeFalsy();
  expect(isProxy('abc')).toBeFalsy();
  expect(isProxy(false)).toBeFalsy();
  expect(isProxy(true)).toBeFalsy();
  expect(isProxy([1, 2, 3])).toBeFalsy();
  expect(isProxy(new GlobalProxy({}, {}))).toBeFalsy();
  expect(isProxy(GlobalProxy.revocable({}, {}))).toBeFalsy();
  expect(isProxy(undefined)).toBeFalsy();
  expect(isProxy(null)).toBeFalsy();
  expect(isProxy(123n)).toBeFalsy();
  expect(isProxy(() => {})).toBeFalsy();
  expect(isProxy(function() {})).toBeFalsy();
  expect(isProxy(new Boolean(false))).toBeFalsy();
  expect(isProxy(Symbol('test'))).toBeFalsy();
  expect(isProxy(/test/)).toBeFalsy();
};

var testGarbageCollectedProxy = function(ProxyConstructor, isProxy) {
  var obj = {
    proxy: new ProxyConstructor({}, {}),
    proxyRevocable: ProxyConstructor.revocable({}, {}).proxy
  };

  expect(isProxy(obj.proxy)).toBeTruthy();
  delete obj.proxy;
  expect(isProxy(obj.proxy)).toBeFalsy();

  expect(isProxy(obj.proxyRevocable)).toBeTruthy();
  delete obj.proxyRevocable;
  expect(isProxy(obj.proxyRevocable)).toBeFalsy();
};

describe('Pure isProxy works fine', () => {
  var Proxy;
  var isProxy;
  beforeAll(() => {
    var pure = require('./pure');
    Proxy = pure.Proxy;
    isProxy = pure.isProxy;
  });

  test('should execute proxy traps', () => {
    testTraps(traps => new Proxy(function() {}, traps));
    testTraps(traps => Proxy.revocable(function() {}, traps).proxy);
  });

  test('should be true when the value is a proxy object', () => {
    testWithProxiedValues(Proxy, isProxy);
  });

  test('should be false when the value is not a proxy object', () => {
    testWithNotProxiedValues(isProxy);
  });

  test('should be false when proxy reference is garbage collected', () => {
    testGarbageCollectedProxy(Proxy, isProxy);
  });
});

describe('Global Proxy works fine', () => {
  var isProxy;
  beforeAll(() => {
    isProxy = require('./index').isProxy;
  });

  test('should execute proxy traps', () => {
    testTraps(traps => new Proxy(function() {}, traps));
    testTraps(traps => Proxy.revocable(function() {}, traps).proxy);
  });

  test('should be true when the value is a proxy object', () => {
    testWithProxiedValues(Proxy, isProxy);
  });

  test('should be false when the value is not a proxy object', () => {
    testWithNotProxiedValues(isProxy);
  });

  test('should be false when proxy reference is garbage collected', () => {
    testGarbageCollectedProxy(Proxy, isProxy);
  });
});
