'use strict';
// Usage: node trading-bot/index.js [backtest|signal] SYMBOL [SYMBOL...]
// Example: node trading-bot/index.js backtest AAPL SAP.DE IWDA.AS
const { fetchCloses } = require('./data');
const { backtest } = require('./backtest');
const { signal } = require('./strategy');

async function main() {
  const [mode = 'signal', ...symbols] = process.argv.slice(2);
  if (!symbols.length) symbols.push('AAPL');
  for (const s of symbols) {
    const closes = await fetchCloses(s);
    if (mode === 'backtest') {
      const r = backtest(s, closes);
      console.log(`${s}: ${r.trades} trades, strategy ${r.returnPct.toFixed(1)}% vs buy&hold ${r.buyHoldPct.toFixed(1)}% (final ${r.final.toFixed(2)})`);
    } else {
      console.log(`${s}: last ${closes[closes.length - 1].toFixed(2)} -> ${signal(closes).toUpperCase()}`);
    }
  }
  console.log('Paper/signal only. Not financial advice.');
}
if (require.main === module) main().catch((e) => { console.error(e.message); process.exit(1); });
