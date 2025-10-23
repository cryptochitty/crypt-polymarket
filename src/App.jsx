import React, { useEffect } from 'react';
import Home from './pages/Home';

export default function App() {
  useEffect(() => {
    // Farcaster frame: hide splash if running inside Farcaster frame
    try {
      window.sdk?.actions?.ready?.();
    } catch (e) {
      // not in farcaster frame or sdk unavailable
    }
  }, []);

  return <Home />;
}
