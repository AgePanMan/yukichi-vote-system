import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProposalList() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetch('/api/proposals')
      .then(res => res.json())
      .then(data => setProposals(data));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">提案一覧</h2>
      <ul className="divide-y">
        {proposals.map(p => (
          <li key={p.id} className="py-2">
            <Link to={`/proposal/${p.id}`} className="text-blue-600 hover:underline">
              {p.title}
            </Link>
            <div className="text-sm text-gray-500">
              投票期間: {new Date(p.startTime).toLocaleString()} ～ {new Date(p.endTime).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProposalList;
