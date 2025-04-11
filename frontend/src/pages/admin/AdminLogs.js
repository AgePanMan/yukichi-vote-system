import React, { useEffect, useState } from 'react';

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch('/api/admin/logs')
      .then(res => res.json())
      .then(data => {
        setLogs(data);
        setFiltered(data);
      });
  }, []);

  const handleSearch = () => {
    const lower = keyword.toLowerCase();
    setFiltered(logs.filter(
      log => log.address.toLowerCase().includes(lower) || log.action.toLowerCase().includes(lower)
    ));
  };

  const exportCSV = () => {
    const header = ['timestamp', 'address', 'action', 'detail'];
    const rows = filtered.map(log => [
      new Date(log.timestamp).toISOString(),
      log.address,
      log.action,
      JSON.stringify(log.detail).replace(/"/g, '""')
    ]);
    const csv = [header, ...rows].map(r => r.map(f => `"${f}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'access-logs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">アクセスログ</h2>
      <div className="mb-4 flex items-center gap-2">
        <input
          className="input"
          placeholder="アドレスまたはアクションで検索"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <button className="btn" onClick={handleSearch}>検索</button>
        <button className="btn bg-green-600 text-white" onClick={exportCSV}>CSV出力</button>
      </div>
      <table className="table-auto w-full text-sm">
        <thead>
          <tr><th className="text-left">日時</th><th>アドレス</th><th>アクション</th><th>詳細</th></tr>
        </thead>
        <tbody>
          {filtered.map(log => (
            <tr key={log.id}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.address}</td>
              <td>{log.action}</td>
              <td>{JSON.stringify(log.detail)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
