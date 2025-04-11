import React, { useEffect, useState } from 'react';

export default function AdminOverview() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch('/api/admin/summary')
      .then(res => res.json())
      .then(data => setSummary(data));
  }, []);

  if (!summary) return <div className="p-6">読み込み中...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">管理者ダッシュボード</h2>
      <ul className="list-disc ml-6">
        <li>提案数: {summary.proposalCount}</li>
        <li>投票数: {summary.voteCount}</li>
        <li>BANユーザー数: {summary.bannedCount}</li>
      </ul>
    </div>
  );
}
