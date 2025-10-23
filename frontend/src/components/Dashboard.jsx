import React, { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function Dashboard() {
  const [markets, setMarkets] = useState(null); // null = loading

  useEffect(() => {
    fetch(`${API_URL}/market/all`)
      .then(res => res.json())
      .then(data => setMarkets(data))
      .catch(err => {
        console.error("Market fetch error:", err);
        setMarkets([]); // fallback
      });
  }, []);

  if (markets === null) return <p>Loading markets...</p>;

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Market Dashboard</h2>
      <ul>
        {markets.length === 0 ? (
          <li>No markets found</li>
        ) : (
          markets.map(m => <li key={m.id}>{m.title}</li>)
        )}
      </ul>
    </div>
  );
}

export default Dashboard;
