import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('crypto_prices').select('*');
      if (!error) setCryptos(data);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: cryptos.map(c => c.symbol),
    datasets: [{
      label: 'Price',
      data: cryptos.map(c => c.price),
      borderColor: 'rgb(34,197,94)',
      backgroundColor: 'rgba(34,197,94,0.3)',
    }],
  };

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Crypto Insight Tracker</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cryptos.map(c => (
          <div key={c.id} className="p-4 bg-white rounded shadow">
            <h2 className="font-bold">{c.symbol}</h2>
            <p>Price: ${c.price}</p>
            <p>Change: {c.change}%</p>
            <p>Prediction: N/A</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Line data={chartData} />
      </div>
    </div>
  );
}