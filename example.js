
var humanize = require('./');
var values = [ 341, 12, 42, 54, 591, 123, 271, 1092 ].map(function(x){ return x * 1000 })
var max = Math.max.apply(Math, values);
var intervals = humanize({
  threshold: 0.8,
  segments: 4,
  value: max
}).map(format);

function format(value) {
  if (value >= 10e5) return (value / 10e5) + 'M'; // millions
  if (value >= 10e2) return (value / 10e2) + 'K'; // thousands
  return String(value); // <= hundreds
}

function roundToClosestNaturalPower(val, factor) {
  var n = val.toString().length;
  var multiple = Math.pow(10, n - 2) * factor;
  var rounded = Math.ceil(val / multiple) * multiple;
  return rounded;
}
