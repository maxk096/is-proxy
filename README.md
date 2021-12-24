## is-proxy

[![dependency status][deps-svg]][deps-url] [![License][license-image]][license-url] [![Downloads][downloads-image]][downloads-url]

Checks whether a value is a proxy object

## Install

Install using [npm](https://www.npmjs.com/):

```sh
npm install --save is-proxy
```

or using [yarn](https://yarnpkg.com/)

```sh
yarn add is-proxy
```

## Usage

In order for this library to track when a Proxy object is created, it has to either mutate global Proxy constructor or enforce usage of its own Proxy constructor.

#### Assigning Proxy to the global object

> Note: In this case you **must** include this library at the top of your entry point, so it can pick up Proxy creation properly.

```js
// At the top of your entry point
import 'is-proxy';

// Later
import { isProxy } from 'is-proxy';

const myProxy = new Proxy({}, {});
const myRevocableProxy = Proxy.revocable({}, {});

isProxy(myProxy); // ~> true
isProxy(myRevocableProxy.proxy); // ~> true
```

#### Without global namespace pollution

```js
import { isProxy, Proxy } from 'is-proxy/pure';

const myProxy = new Proxy({}, {});
const myRevocableProxy = Proxy.revocable({}, {});

isProxy(myProxy); // ~> true
isProxy(myRevocableProxy.proxy); // ~> true
```

## API

##### Available in `is-proxy` and `is-proxy/pure`:

_isProxy(o: any): boolean_ - returns true if `o` is a proxy object, false if it is not.

##### Available in `is-proxy/pure`:

_Proxy_ - JavaScript [`Proxy`][proxy-url], with proxy creation tracking.

### Author

**Max Kanaradze**

[GitHub Profile](https://github.com/maxk096)

### MIT Licensed

[deps-svg]: http://david-dm.org/inspect-js/is-proxy/status.svg
[deps-url]: http://david-dm.org/inspect-js/is-proxy
[license-image]: http://img.shields.io/npm/l/is-proxy.svg
[license-url]: LICENSE
[downloads-url]: http://npm-stat.com/charts.html?package=is-proxy
[proxy-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
[downloads-image]: https://img.shields.io/npm/dm/is-proxy
