
var humanize = require('./');
var values = [ 341, 12, 793, 42, 54, 591, 123, 271 ];
var max = Math.max.apply(Math, values);
var intervals = humanize(2, max).map(format);
// [ 0, '3K', '6K' ]
// [ 0, '4K', '8K', '12K' ]
console.log(intervals);

function format(value) {
  if (value > 10e5) return (value / 10e5) + 'M'; // millions
  if (value > 10e2) return (value / 10e2) + 'K'; // thousands
  return value; // <= hundreds
}
