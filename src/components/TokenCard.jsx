import React, { useEffect, useState } from 'react';
import { calcRSI, calcSMA } from '../lib/indicators';
import { recordEngagement } from '../lib/api';

export default function TokenCard({ token }) {
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState('—');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadHistory() {
      setLoading(true);
      try {
        // token.id expected to be coingecko id
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${token.id}/market_chart?vs_currency=usd&days=7&interval=hourly`);
        const json = await res.json();
        // json.prices -> [ [timestamp, price], ...]
        const prices = (json.prices || []).map(p => p[1]);
        if (!mounted) return;
        setHistory(prices);

        // indicators
        const sma20 = calcSMA(prices, 20);
        const rsi14 = calcRSI(prices, 14);
        // simple rule example:
        if (rsi14 < 30 && prices[prices.length - 1] > sma20) setPrediction('Buy');
        else if (rsi14 > 70 && prices[prices.length - 1] < sma20) setPrediction('Sell');
        else setPrediction('Hold');
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    loadHistory();
    return () => { mounted = false; };
  }, [token.id]);

  const onView = async () => {
    // record engagement (uses serverless API)
    try {
      await recordEngagement({ action: 'view_token', metadata: { symbol: token.symbol } });
    } catch (e) {}
  };

  return (
    <div className="bg-white rounded-lg shadow p-4" onClick={onView}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-bold">{token.symbol.toUpperCase()}</div>
          <div className="text-sm text-gray-500">{token.name}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">${token.current_price.toLocaleString()}</div>
          <div className={`text-sm ${token.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {token.price_change_percentage_24h?.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="text-sm">Prediction: <span className="font-semibold">{loading ? '...' : prediction}</span></div>
      </div>
    </div>
  );
}
