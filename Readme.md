
# human-intervals

## Installation

```
npm install human-intervals
```

```
component install segmentio/human-intervals
```

## Example

```js
var humanize = require('human-intervals');
var assert = require('assert');

var values = [ 341, 12, 793, 42, 54, 591, 123, 271, 804 ];
var max = Math.max.apply(Math, values);

assert.deepEqual(humanize(2, max).map(format), [ '500', '1K' ]);
assert.deepEqual(humanize(3, max).map(format), [ '500', '1K', '1.5K' ]);
assert.deepEqual(humanize(4, max).map(format), [ '250', '500', '750', '1K' ]);
assert.deepEqual(humanize(5, max).map(format), [ '200', '400', '600', '800', '1K']);

var values = [ 341, 12, 793, 42, 54, 591, 123, 271 ];
var max = Math.max.apply(Math, values);

assert.deepEqual(humanize(2, max).map(format), [ '500', '1K' ]);
assert.deepEqual(humanize(3, max).map(format), [ '500', '1K', '1.5K' ]);
assert.deepEqual(humanize(4, max).map(format), [ '200', '400', '600', '800' ]);
assert.deepEqual(humanize(5, max).map(format), [ '200', '400', '600', '800', '1K']);

var values = [ 341, 12, 42, 54, 591, 123, 271 ];
var max = Math.max.apply(Math, values);

assert.deepEqual(humanize(2, max).map(format), [ '500', '1K' ]);
assert.deepEqual(humanize(3, max).map(format), [ '200', '400', '600' ]);
assert.deepEqual(humanize(4, max).map(format), [ '200', '400', '600', '800' ]);
assert.deepEqual(humanize(5, max).map(format), [ '200', '400', '600', '800', '1K']);

function format(value) {
  if (value > 10e5) return (value / 10e5) + 'M'; // millions
  if (value > 10e2) return (value / 10e2) + 'K'; // thousands
  return String(value); // <= hundreds
}
```
