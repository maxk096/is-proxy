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
isProxy(myRevocableProxy); // ~> true
```

#### Without global namespace pollution

```js
import { isProxy, Proxy } from 'is-proxy/pure';

const myProxy = new Proxy({}, {});
const myRevocableProxy = Proxy.revocable({}, {});

isProxy(myProxy); // ~> true
isProxy(myRevocableProxy); // ~> true
```

### Author

**Max Kanaradze**

[GitHub Profile](https://github.com/null096)

### MIT Licensed