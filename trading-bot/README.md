# Trading bot (paper trading / signals)

Zero-dependency Node 18+ bot: SMA crossover strategy, backtester, paper broker.

    node trading-bot/index.js signal AAPL SAP.DE
    node trading-bot/index.js backtest AAPL
    node --test trading-bot/test/strategy.test.js

**Trade Republic:** there is no official API, and unofficial clients violate their terms and can get your account blocked. So the bot only emits signals / paper trades; place real orders manually in the app. Backtests are not predictive. Not financial advice.

## Telegram alerts
1. Create a bot with @BotFather, copy the token. Send your bot a message, then open `https://api.telegram.org/bot<TOKEN>/getUpdates` to find your `chat.id`.
2. `TELEGRAM_BOT_TOKEN=... TELEGRAM_CHAT_ID=... node trading-bot/index.js notify AAPL SAP.DE`
3. Run it daily after market close (cron / GitHub Actions). It only messages on buy/sell, not on hold.
