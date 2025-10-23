const API_URL = "http://127.0.0.1:8000"; // backend

import React from "react";
import WalletConnect from "./components/WalletConnect";
import Portfolio from "./components/Portfolio";
import Alerts from "./components/Alerts";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Crypto Insight Tracker</h1>
      <WalletConnect />
      <Dashboard />
      <Portfolio />
      <Alerts />
    </div>
  );
}

export default App;
