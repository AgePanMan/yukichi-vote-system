import React, { useState } from 'react';

export default function AdminNotification() {
  const [type, setType] = useState('投票開始');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  const handleSend = async () => {
    const res = await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, message })
    });
    const data = await res.json();
    if (data.success) {
      setResult('通知を送信しました');
      setMessage('');
    } else {
      setResult('送信失敗');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">通知送信</h2>
      <select className="input block mb-2" value={type} onChange={e => setType(e.target.value)}>
        <option value="投票開始">投票開始</option>
        <option value="投票終了">投票終了</option>
        <option value="お知らせ">お知らせ</option>
      </select>
      <textarea className="textarea block mb-2" placeholder="通知内容" value={message} onChange={e => setMessage(e.target.value)} />
      <button className="btn" onClick={handleSend}>送信</button>
      <p className="text-green-600 mt-2">{result}</p>
    </div>
  );
}
