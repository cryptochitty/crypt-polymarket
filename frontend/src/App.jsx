import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import Dashboard from "./components/Dashboard";
import Portfolio from "./components/Portfolio";
import Alerts from "./components/Alerts";

const API_URL = "https://your-backend-url.com"; // replace with deployed backend

export default function App() {
  const [wallet, setWallet] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Crypto Insight Tracker</h1>
      <WalletConnect onConnect={setWallet} />
      <Dashboard API_URL={API_URL} />
      <Portfolio API_URL={API_URL} wallet={wallet} />
      <Alerts API_URL={API_URL} wallet={wallet} />
    </div>
  );
}
