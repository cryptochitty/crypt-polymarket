import React, { useEffect, useState } from "react";

export default function Portfolio({ API_URL, wallet }) {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    if (!wallet) return;
    fetch(`${API_URL}/portfolio/${wallet}`)
      .then(res => res.json())
      .then(data => setPortfolio(data.portfolio || []))
      .catch(err => console.error("Error fetching portfolio:", err));
  }, [API_URL, wallet]);

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Portfolio</h2>
      {portfolio.length === 0 ? (
        <p>No assets</p>
      ) : (
        <ul>
          {portfolio.map((asset, i) => (
            <li key={i}>{asset.name} - {asset.amount}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
