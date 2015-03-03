
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
var values = [ 341, 12, 793, 42, 54, 591, 123, 271 ];
var ticks = 3;
var max = Math.max.apply(Math, values);
var intervals = humanize(ticks, max).map(format);

function format(value) {
  if (value > 10e5) return (value / 10e5) + 'M'; // millions
  if (value > 10e2) return (value / 10e2) + 'K'; // thousands
  return value; // <= hundreds
}
```
