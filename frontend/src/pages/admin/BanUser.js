import React, { useState } from 'react';

export default function BanUser() {
  const [address, setAddress] = useState('');
  const [reason, setReason] = useState('');
  const [result, setResult] = useState('');

  const handleBan = async () => {
    const res = await fetch('/api/admin/ban', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, reason })
    });
    const data = await res.json();
    if (data.success) {
      setResult('BANしました: ' + address);
    } else {
      setResult('BAN失敗: ' + (data.error || 'エラー'));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">ユーザーBAN</h2>
      <input className="input block mb-2" placeholder="アドレス" value={address} onChange={e => setAddress(e.target.value)} />
      <input className="input block mb-2" placeholder="理由" value={reason} onChange={e => setReason(e.target.value)} />
      <button className="btn" onClick={handleBan}>BAN実行</button>
      <p className="mt-2 text-green-600">{result}</p>
    </div>
  );
}
