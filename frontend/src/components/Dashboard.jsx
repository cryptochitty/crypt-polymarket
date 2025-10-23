import React, { useEffect, useState } from "react";

export default function Dashboard({ API_URL }) {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/market/all`)
      .then(res => res.json())
      .then(data => setMarkets(data))
      .catch(err => console.error("Error fetching markets:", err));
  }, [API_URL]);

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Market Dashboard</h2>
      {markets.length === 0 ? (
        <p>No markets found</p>
      ) : (
        <ul>
          {markets.map(m => (
            <li key={m.id}>{m.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
