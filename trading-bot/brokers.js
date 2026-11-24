'use strict';
// Broker interface: { cash, positions, buy(symbol, price, qty), sell(symbol, price, qty) }
class PaperBroker {
  constructor(cash = 10000, fee = 1) { // Trade Republic: ~1 EUR flat fee per order
    this.cash = cash; this.fee = fee; this.positions = {}; this.trades = [];
  }
  buy(symbol, price, qty) {
    const cost = price * qty + this.fee;
    if (qty <= 0 || cost > this.cash) return false;
    this.cash -= cost;
    this.positions[symbol] = (this.positions[symbol] || 0) + qty;
    this.trades.push({ side: 'buy', symbol, price, qty });
    return true;
  }
  sell(symbol, price, qty) {
    if (qty <= 0 || (this.positions[symbol] || 0) < qty) return false;
    this.cash += price * qty - this.fee;
    this.positions[symbol] -= qty;
    this.trades.push({ side: 'sell', symbol, price, qty });
    return true;
  }
  equity(prices) {
    return Object.entries(this.positions).reduce((e, [s, q]) => e + q * (prices[s] || 0), this.cash);
  }
}

// Trade Republic has NO official public API. Automating it with unofficial
// clients (e.g. pytr) breaks their terms and risks your account, so real order
// execution is deliberately not implemented. Use the bot's signals and place
// orders manually in the app.
class TradeRepublicBroker {
  constructor() { throw new Error('Trade Republic offers no official trading API; use PaperBroker and place orders manually.'); }
}
module.exports = { PaperBroker, TradeRepublicBroker };
