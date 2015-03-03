
/**
 * Expose `compute`.
 */

module.exports = compute;

/**
 * Algorithm to compute nice human-readable intervals.
 *
 * @param {Integer} count The number of intervals that should appear in the axis.
 * @param {Integer} max The biggest value to appear in the plot.
 * @return {Array}
 */

function compute(count, max) {
  var magnitude = roundedOrderOfMagnitude(max);
  var multiplier = magnitude * count;
  var attempts = [ 10, 5, 2 ]; // how humans sorta think of pretty labels.
  var i = attempts.length;
  while (multiplier < max && --i) multiplier *= attempts[i];
  return build(count, multiplier);
}

/**
 * Create a set of clean intervals for a graph axis.
 *
 * @param {Integer} count
 * @param {Integer} multiplier
 * @return {Array} intervals
 */

function build(count, multiplier) {
  var intervals = new Array(count);
  while (count--) intervals[count] = count * multiplier;
  return intervals;
}

/**
 * Get order of magnitude from an integer.
 *
 * @param {Integer} val
 * @return {Integer}
 */

function orderOfMagnitude(val) {
  var order = Math.floor((Math.log(val) / Math.LN10) + 0.000000001);
  return Math.pow(10, order);
}

/**
 * Nearest order of magnitude after rounding.
 */

function roundedOrderOfMagnitude(val) {
  var magnitude = orderOfMagnitude(val);

  val = val / magnitude;
  val = Math.ceil(val);
  val = val * magnitude;
  return val;
}
