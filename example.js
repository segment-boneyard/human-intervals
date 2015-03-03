
var humanize = require('./');
var values = [ 341, 12, 793, 42, 54, 591, 123, 271, 804 ];
var max = Math.max.apply(Math, values);
var intervals = humanize(4, max).map(format);
console.log(intervals);

function format(value) {
  if (value >= 10e5) return (value / 10e5) + 'M'; // millions
  if (value >= 10e2) return (value / 10e2) + 'K'; // thousands
  return String(value); // <= hundreds
}
