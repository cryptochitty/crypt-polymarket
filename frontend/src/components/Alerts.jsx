import React, { useEffect, useState } from "react";

export default function Alerts({ API_URL, wallet }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!wallet) return;
    fetch(`${API_URL}/alerts/${wallet}`)
      .then(res => res.json())
      .then(data => setAlerts(data.alerts || []))
      .catch(err => console.error("Error fetching alerts:", err));
  }, [API_URL, wallet]);

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Alerts</h2>
      {alerts.length === 0 ? (
        <p>No alerts</p>
      ) : (
        <ul>
          {alerts.map((a, i) => (
            <li key={i}>{a.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
