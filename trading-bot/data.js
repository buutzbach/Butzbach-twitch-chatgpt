'use strict';
// Daily closes from Yahoo Finance's public chart endpoint (no API key).
async function fetchCloses(symbol, range = '1y') {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=1d`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`Data fetch failed for ${symbol}: HTTP ${res.status}`);
  const json = await res.json();
  const r = json.chart && json.chart.result && json.chart.result[0];
  if (!r) throw new Error(`No data for ${symbol}`);
  return r.indicators.quote[0].close.filter((c) => c != null);
}
module.exports = { fetchCloses };
