
/**
 * Expose `compute`.
 */

module.exports = compute;

/**
 * Algorithm to compute nice human-readable intervals.
 *
 * @param {Object} opts
 *   @property {Integer} segments The number of intervals that should appear in the axis.
 *   @property {Integer} max The biggest value to appear in the plot.
 *   @property {Integer} threshold How close you want the max to be to the end of the graph ideally.
 * @return {Array}
 */

function compute(opts) {
  opts = opts || {};
  var threshold = opts.threshold || 0.5;
  var segments = opts.segments || 4;
  var max = opts.value;
  var a = round(max, 3);
  var b = round(max, 4);
  var c = round(max, 5);
  var e = max / a;
  var f = max / b;
  var g = max / c;
  var x = build(segments, a);
  var y = build(segments, b);
  var z = build(segments, c);
  var q = x.reduce(rank, Math.abs(threshold - e));
  var r = y.reduce(rank, Math.abs(threshold - f));
  var s = z.reduce(rank, Math.abs(threshold - g));
  var min = Math.min(q, r, s); // lowest score wins
  switch (min) {
    case q: return x;
    case r: return y;
    case s: return z;
  }
}

/**
 * Create a set of clean intervals for a graph axis.
 *
 * @param {Integer} segments
 * @param {Integer} range
 * @return {Array} intervals
 */

function build(segments, range) {
  var ratio = range / segments;
  var intervals = new Array(segments);
  while (segments--) intervals[segments] = (segments + 1) * ratio;
  intervals.unshift(0); // always have 0 at the beginning.
  return intervals;
}

/**
 * Attempt at ranking.
 */

function rank(score, interval) {
  var str = interval.toString();
  var multiplier = str.length;
  // never use decimals.
  if (str.match('.')) multiplier *= 1000;
  // lose points the fewer zeros you have.
  multiplier *= (10 * ((str.match(/[1-9]+/g) || []).join('').length + 1));
  return score + multiplier;
}

/**
 * Round up to closest "natural" power.
 *
 *   298141 -> 300000
 *   301000 -> 310000
 *   300001 -> 310000
 *   300000 -> 300000
 *   30012 -> 31000
 *   3012 -> 3100
 *   3191 -> 3200
 *   3510 -> 3600
 *   351 -> 360
 *
 * @param {Integer} val
 * @param {Integer} factor Values 5, 4, and 3 are good ones to try.
 * @return {Integer}
 */

function round(val, factor) {
  var n = val.toString().length;
  var multiple = Math.pow(10, n - 2) * (factor * 2);
  var rounded = Math.ceil(val / multiple) * multiple;
  return rounded;
}
