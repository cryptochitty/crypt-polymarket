import React, { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function Alerts() {
  const [alerts, setAlerts] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/alerts/all`)
      .then(res => res.json())
      .then(data => setAlerts(data))
      .catch(err => {
        console.error("Alerts fetch error:", err);
        setAlerts([]); // fallback
      });
  }, []);

  if (alerts === null) return <p>Loading alerts...</p>;

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Alerts</h2>
      <ul>
        {alerts.length === 0 ? (
          <li>No alerts</li>
        ) : (
          alerts.map(a => (
            <li key={a.id}>
              {a.market} target: {a.target_price} ({a.status})
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Alerts;
