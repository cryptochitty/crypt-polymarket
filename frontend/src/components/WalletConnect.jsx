import React, { useState } from "react";
import { ethers } from "ethers";

export default function WalletConnect({ onConnect }) {
  const [wallet, setWallet] = useState(null);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWallet(address);
        onConnect(address); // pass to parent
        console.log("Connected wallet:", address);
      } catch (err) {
        console.error("Wallet connection error:", err);
      }
    } else {
      alert("Install MetaMask or Valora!");
    }
  }

  return (
    <div className="mb-4">
      <button
        onClick={connectWallet}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {wallet ? `Connected: ${wallet.substring(0,6)}...${wallet.slice(-4)}` : "Connect Wallet"}
      </button>
    </div>
  );
}
