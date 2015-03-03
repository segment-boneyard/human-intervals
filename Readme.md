
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

assert.deepEqual(humanize({ segments: 2, value: max }).map(format), [ '0', '450', '900' ]);
assert.deepEqual(humanize({ segments: 3, value: max }).map(format), [ '0', '300', '600', '900' ]);
assert.deepEqual(humanize({ segments: 4, value: max }).map(format), [ '0', '210', '420', '630', '840' ]);
assert.deepEqual(humanize({ segments: 5, value: max }).map(format), [ '0', '180', '360', '540', '720', '900']);

var values = [ 341, 12, 793, 42, 54, 591, 123, 271, 804, 1029 ].map(thousand);
var max = Math.max.apply(Math, values);

assert.deepEqual(humanize({ segments: 2, value: max }).map(format), [ '0', '1M', '2M' ]);
assert.deepEqual(humanize({ segments: 3, value: max }).map(format), [ '0', '400K', '800K', '1.2M' ]);
assert.deepEqual(humanize({ segments: 4, value: max }).map(format), [ '0', '300K', '600K', '900K', '1.2M' ]);
assert.deepEqual(humanize({ segments: 5, value: max }).map(format), [ '0', '400K', '800K', '1.2M', '1.6M', '2M']);

function format(value) {
  if (value > 10e5) return (value / 10e5) + 'M'; // millions
  if (value > 10e2) return (value / 10e2) + 'K'; // thousands
  return String(value); // <= hundreds
}
```
