import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

function UserProfile() {
  const { wallet, connectWallet } = useWeb3();
  const [proposals, setProposals] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    if (!wallet) return;
    fetch(`/api/proposals/user/${wallet.address}/proposals`)
      .then(res => res.json())
      .then(data => setProposals(data));
    fetch(`/api/proposals/user/${wallet.address}/votes`)
      .then(res => res.json())
      .then(data => setVotes(data));
  }, [wallet]);

  if (!wallet) return <button className="btn" onClick={connectWallet}>ウォレット接続</button>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">ユーザープロファイル</h2>
      <h3 className="text-lg font-semibold mt-4">作成した提案</h3>
      <ul className="list-disc ml-6">
        {proposals.map(p => <li key={p.id}>{p.title}</li>)}
      </ul>
      <h3 className="text-lg font-semibold mt-6">投票履歴</h3>
      <ul className="list-disc ml-6">
        {votes.map((v, i) => (
          <li key={i}>提案#{v.proposalId} に「{v.option}」で投票（重み: {v.weight}）</li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;
