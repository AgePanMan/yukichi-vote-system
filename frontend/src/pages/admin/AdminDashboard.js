import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">管理ダッシュボード</h2>
      <ul className="list-disc ml-6">
        <li><Link to="/admin/ban-users" className="text-blue-600">ユーザーBAN管理</Link></li>
        <li><Link to="/admin/proposals" className="text-blue-600">提案管理</Link></li>
      </ul>
    </div>
  );
}
