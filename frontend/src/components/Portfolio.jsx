import React, { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function Portfolio() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/portfolio/all`)
      .then(res => res.json())
      .then(data => setPortfolio(data))
      .catch(err => {
        console.error("Portfolio fetch error:", err);
        setPortfolio([]); // fallback
      });
  }, []);

  if (portfolio === null) return <p>Loading portfolio...</p>;

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Your Portfolio</h2>
      <ul>
        {portfolio.length === 0 ? (
          <li>No portfolio found</li>
        ) : (
          portfolio.map(p => (
            <li key={p.id}>
              {p.asset}: {p.amount} ({p.gain_loss})
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Portfolio;
