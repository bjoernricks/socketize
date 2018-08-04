# socketize

Promise based socket communication for Node.js

## The Problem

Node.js provides a callback based Socket API in the
[Net](https://nodejs.org/dist/latest-v8.x/docs/api/net.html#net_class_net_socket)
package. Using this API you might end up in the callback hell.
Therefore **socketize** provides a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
based Socket communication arround the Net API.

## Installation

To install the stable version:

```
npm install --save socketize
```

if you are using [npm](https://www.npmjs.com/) as your package manager and

```
yarn add socketize
```

for using [yarn](https://yarnpkg.com/en/).

## Examples

### Simple Unix Socket communication

```JavaScript
import Socket from 'socketize';

const socket = new Socket();

socket.connect({path: '/var/run/my.unix.socket'})
  .then(() => socket.write('Hello world'));
  .then(() => socket.read())
  // remote server responds with '42'
  .then(answer => console.log('The answer is', answer));
  // 'The answer is 42'
  .catch(err => console.log(err));
```
### Stateful reading

```JavaScript
import Socket from 'socketize';

const createReader = () => {
  const end = false;
  return {
    read: (data = '', chunk) => {
      // read until 'END' is contained in the response
      const readdata = data + chunk;
      if (readdata.endsWith('END')) {
        end = true;
        return data += chunk.slice(0, -3).trim();
      }
      return readdata;
    };
    isDone: () => end,
  };
};

const reader = createReader();
const socket = new Socket();

socket.connect({path: '/var/run/my.unix.socket'})
  .then(() => socket.write('Hello world'));
  .then(() => socket.read(reader.read, reader.isDone));
  // remote server responds with '42 END'
  .then(answer => console.log('The answer is' answer));
  // 'The answer is 42'
```

## License

Licensed under the MIT License, Copyright © 2018 Björn Ricks

See [LICENSE](./LICENSE) for details.
