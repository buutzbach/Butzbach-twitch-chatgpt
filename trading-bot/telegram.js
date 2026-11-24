'use strict';
// Sends a message via the Telegram Bot API. Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.
async function sendTelegram(text, { token = process.env.TELEGRAM_BOT_TOKEN, chatId = process.env.TELEGRAM_CHAT_ID } = {}) {
  if (!token || !chatId) throw new Error('Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID');
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!res.ok) throw new Error(`Telegram error: HTTP ${res.status}`);
}
module.exports = { sendTelegram };
