'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { signal } = require('../strategy');
const { backtest } = require('../backtest');

const down = Array.from({ length: 40 }, (_, i) => 100 - i);
const up = Array.from({ length: 40 }, (_, i) => 60 + i * 2);
test('buy signal on upward cross', () => {
  const c = [...down, ...up]; let buys = 0;
  for (let i = 31; i <= c.length; i++) if (signal(c.slice(0, i)) === 'buy') buys++;
  assert.strictEqual(buys, 1);
});
test('backtest runs and trades', () => {
  const r = backtest('X', [...down, ...up]);
  assert.ok(r.trades >= 1 && r.final > 0);
});
