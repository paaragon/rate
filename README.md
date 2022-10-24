# RateLimit Fn

this package allows to limit the speed with which a function is called.

## Installation

```
npm install ratelimit-fn
```

## Usage 

```javascript
function rate(fn, perSec)
```

Params:
- **fn**: the function to rate
- **perSec**: the number of allowed executions per second

## Example (Js)

```javascript
const rate = require('ratelimitfn').rate;

const myLimitedFn = rate(console.log, 1);

// this will fire console.log one time per second
myLimitedFn('Hello world!');
myLimitedFn('Hello world!');
myLimitedFn('Hello world!');
```

## Example (Ts)

```typescript
import { rate } from 'ratelimitfn';

const myLimitedFn = rate(console.log, 1);

// this will fire console.log one time per second
myLimitedFn('Hello world!');
myLimitedFn('Hello world!');
myLimitedFn('Hello world!');
```

## Use with promises or callbacks

Rated functions will return promises, so you can wait them to finish. Example:

```typescript
import { rate } from 'ratelimitfn';

const myLimitedFn = rate(console.log, 1);

// this will fire console.log one time per second
await myLimitedFn('Hello world!');
console.log('This will be executed after the previous line');
```

If your rated function receives a callback, you can use it as you would do without the package. Exmaple:

```typescript
import { rate } from 'ratelimitfn';

function myFn(message, cb) {
  console.log('message');
  cb();
}

const myLimitedFn = rate(myFn.log, 1);

// this will fire console.log one time per second
myLimitedFn('Hello world!', () => {
    console.log('This will be executed when the rate limit allows it');
});
```
