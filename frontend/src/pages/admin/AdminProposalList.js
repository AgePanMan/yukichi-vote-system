import React, { useEffect, useState } from 'react';

export default function AdminProposalList() {
  const [proposals, setProposals] = useState([]);

  const fetchProposals = async () => {
    const res = await fetch('/api/proposals');
    const data = await res.json();
    setProposals(data);
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const deleteProposal = async (id) => {
    if (!window.confirm('本当に削除しますか？')) return;
    await fetch('/api/proposals/' + id, { method: 'DELETE' });
    fetchProposals();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">提案管理</h2>
      <ul className="divide-y">
        {proposals.map(p => (
          <li key={p.id} className="py-2">
            <div className="flex justify-between items-center">
              <div>
                <strong>{p.title}</strong> ({p.address})
                <div className="text-sm text-gray-500">
                  投票期間: {new Date(p.startTime).toLocaleString()} - {new Date(p.endTime).toLocaleString()}
                </div>
              </div>
              <button className="btn bg-red-500 text-white ml-4" onClick={() => deleteProposal(p.id)}>削除</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
