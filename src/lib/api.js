// small client helpers: fetch top tokens + record engagement to serverless API
export async function fetchTopTokens(limit = 10) {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch tokens');
  return res.json();
}

export async function recordEngagement(payload) {
  // serverless endpoint (deployed on Vercel as /api/track)
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    // noop
  }
}
