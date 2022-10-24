# RateLimit Fn

this package allows to limit the speed with which a function is called.

## Installation

```
npm install ratelimitfn
```

## Usage 

```
function rate(fn, perSec)
```

Params:
    - fn: the function to rate
    - perSec: the number of allowed executions per second

## Example (Js)

```
const rate = require('ratelimitfn').rate;

const myLimitedFn = rate(console.log, 1);

// this will fire console.log one time per second
myLimitedFn('Hello world!');
myLimitedFn('Hello world!');
myLimitedFn('Hello world!');
myLimitedFn('Hello world!');
myLimitedFn('Hello world!');
```

## Example (Ts)

```
import { rate } from 'ratelimitfn';
```
