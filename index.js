
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
  var upperMagnitude = roundedOrderOfMagnitude(max);
  var lowerMagnitude = orderOfMagnitude(max);
  var attempts = [ 10, 5, 2, 1 ]; // how humans sorta think of pretty labels.
  var i = attempts.length;
  var multipliers = [];
  // if the rounded-up version is not an integer, then ignore
  var check = upperMagnitude / count;
  if (check === parseInt(check)) multipliers.push(upperMagnitude);
  while (--i) multipliers.push(attempts[i] * lowerMagnitude * count);
  multipliers = multipliers.sort(sortByNumber);
  var i = multipliers.length;
  var multiplier = multiplier = multipliers[--i];
  while (multiplier < max) multiplier = multipliers[--i];
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
  var ratio = multiplier / count;
  var intervals = new Array(count);
  while (count--) intervals[count] = (count + 1) * ratio;
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
 *
 * @param {Integer} val
 * @return {Integer}
 */

function roundedOrderOfMagnitude(val) {
  val = val * 1.0
  var lowerMagnitude = orderOfMagnitude(val);
  var upperMagnitude = lowerMagnitude * 10;
  val = val / upperMagnitude;
  val = Math.ceil(val);
  return val // 0 or 1
    ? upperMagnitude
    : lowerMagnitude;
}

/**
 * Sort by number.
 *
 * @param {Integer} a
 * @param {Integer} b
 * @return {Boolean}
 */

function sortByNumber(a, b) {
  return b - a;
}
