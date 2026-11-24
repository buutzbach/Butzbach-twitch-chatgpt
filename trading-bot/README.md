# Trading bot (paper trading / signals)

Zero-dependency Node 18+ bot: SMA crossover strategy, backtester, paper broker.

    node trading-bot/index.js signal AAPL SAP.DE
    node trading-bot/index.js backtest AAPL
    node --test trading-bot/test/strategy.test.js

**Trade Republic:** there is no official API, and unofficial clients violate their terms and can get your account blocked. So the bot only emits signals / paper trades; place real orders manually in the app. Backtests are not predictive. Not financial advice.
