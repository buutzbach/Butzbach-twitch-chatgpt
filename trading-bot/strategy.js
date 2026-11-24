'use strict';
// SMA crossover: returns 'buy' | 'sell' | 'hold' for the latest candle.
function sma(values, n, end = values.length) {
  if (end < n) return null;
  let s = 0;
  for (let i = end - n; i < end; i++) s += values[i];
  return s / n;
}

function signal(closes, fast = 10, slow = 30) {
  const f = sma(closes, fast), s = sma(closes, slow);
  const pf = sma(closes, fast, closes.length - 1), ps = sma(closes, slow, closes.length - 1);
  if ([f, s, pf, ps].some((v) => v === null)) return 'hold';
  if (pf <= ps && f > s) return 'buy';
  if (pf >= ps && f < s) return 'sell';
  return 'hold';
}
module.exports = { sma, signal };
