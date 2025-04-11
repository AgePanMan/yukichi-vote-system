import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

function ProposalCreate() {
  const { wallet, connectWallet } = useWeb3();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [strategy, setStrategy] = useState('one-address-one-vote');
  const [includeUnclaimed, setIncludeUnclaimed] = useState(false);

  const addOption = () => setOptions([...options, '']);
  const updateOption = (i, val) => {
    const copy = [...options];
    copy[i] = val;
    setOptions(copy);
  };

  const handleSubmit = async () => {
    if (!wallet) return alert('ウォレット未接続');
    const res = await fetch('/api/proposals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        startTime,
        endTime,
        options,
        strategy,
        includeUnclaimed,
        address: wallet.address
      })
    });
    const data = await res.json();
    if (data.success) alert('提案が作成されました');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">提案作成</h2>
      {!wallet && <button onClick={connectWallet} className="btn">ウォレット接続</button>}
      <input className="input" placeholder="タイトル" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea className="textarea" placeholder="説明文" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="datetime-local" className="input" value={startTime} onChange={e => setStartTime(e.target.value)} />
      <input type="datetime-local" className="input" value={endTime} onChange={e => setEndTime(e.target.value)} />
      <div className="my-2">
        {options.map((opt, idx) => (
          <input key={idx} className="input" value={opt} onChange={e => updateOption(idx, e.target.value)} placeholder={`選択肢${idx + 1}`} />
        ))}
        <button onClick={addOption} className="btn">選択肢追加</button>
      </div>
      <select className="input" value={strategy} onChange={e => setStrategy(e.target.value)}>
        <option value="one-address-one-vote">1アドレス1票</option>
        <option value="weight-by-token">トークン保有量比例</option>
      </select>
      <label className="flex items-center mt-2">
        <input type="checkbox" checked={includeUnclaimed} onChange={e => setIncludeUnclaimed(e.target.checked)} />
        <span className="ml-2">未Claimトークンも含める</span>
      </label>
      <button className="btn mt-4" onClick={handleSubmit}>提案作成</button>
    </div>
  );
}

export default ProposalCreate;
