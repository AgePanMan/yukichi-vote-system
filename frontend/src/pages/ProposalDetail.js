import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

function ProposalDetail() {
  const { id } = useParams();
  const { wallet, connectWallet } = useWeb3();
  const [proposal, setProposal] = useState(null);
  const [selected, setSelected] = useState('');
  const [results, setResults] = useState({});

  useEffect(() => {
    fetch(`/api/proposals/${id}`)
      .then(res => res.json())
      .then(data => {
        setProposal(data);
        fetchResults();
      });
  }, [id]);

  const fetchResults = async () => {
    const res = await fetch(`/api/proposals/${id}/results`);
    const data = await res.json();
    setResults(data);
  };

  const handleVote = async () => {
    if (!wallet) return alert('ウォレット未接続');
    if (!selected) return alert('選択肢を選んでください');
    const res = await fetch(`/api/proposals/${id}/votes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        voter: wallet.address,
        option: selected
      })
    });
    const data = await res.json();
    if (data.success) {
      alert('投票完了しました');
      fetchResults();
    }
  };

  if (!proposal) return <div>読み込み中...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{proposal.title}</h2>
      <p className="text-gray-700 mb-4">{proposal.description}</p>
      <div className="mb-4">
        {proposal.options.map((opt, i) => (
          <div key={i} className="flex items-center">
            <input
              type="radio"
              name="option"
              value={opt}
              onChange={() => setSelected(opt)}
              className="mr-2"
            />
            <span>{opt}</span>
            <span className="ml-auto text-sm text-gray-500">票数: {results[opt] || 0}</span>
          </div>
        ))}
      </div>
      {!wallet && <button className="btn" onClick={connectWallet}>ウォレット接続</button>}
      <button className="btn" onClick={handleVote}>投票する</button>
    </div>
  );
}

export default ProposalDetail;
