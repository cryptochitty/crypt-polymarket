import React, { useEffect, useState } from 'react';
import TokenGrid from '../components/TokenGrid';
import { fetchTopTokens } from '../lib/api';

export default function Home() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch top tokens (CoinGecko) and show top 10
    (async () => {
      setLoading(true);
      try {
        const top = await fetchTopTokens(10);
        setTokens(top);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <header className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Crypto Insight Tracker</h1>
      </header>
      <main className="max-w-6xl mx-auto">
        {loading ? <p className="text-center">Loading tokens…</p> : <TokenGrid tokens={tokens} />}
      </main>
    </div>
  );
}
