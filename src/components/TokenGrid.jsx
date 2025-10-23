import React from 'react';
import TokenCard from './TokenCard';

export default function TokenGrid({ tokens }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {tokens.map((t) => (
        <TokenCard key={t.id} token={t} />
      ))}
    </div>
  );
}
