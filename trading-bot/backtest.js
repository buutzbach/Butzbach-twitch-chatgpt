'use strict';
const { signal } = require('./strategy');
const { PaperBroker } = require('./brokers');

// Goes all-in on buy signals, fully exits on sell signals.
function backtest(symbol, closes, { cash = 10000, fast = 10, slow = 30 } = {}) {
  const broker = new PaperBroker(cash);
  for (let i = slow + 1; i <= closes.length; i++) {
    const window = closes.slice(0, i), price = window[i - 1];
    const sig = signal(window, fast, slow);
    if (sig === 'buy') broker.buy(symbol, price, Math.floor((broker.cash - broker.fee) / price));
    else if (sig === 'sell') broker.sell(symbol, price, broker.positions[symbol] || 0);
  }
  const last = closes[closes.length - 1];
  const final = broker.equity({ [symbol]: last });
  return {
    symbol, trades: broker.trades.length, final,
    returnPct: ((final / cash - 1) * 100),
    buyHoldPct: ((last / closes[slow] - 1) * 100),
  };
}
module.exports = { backtest };
