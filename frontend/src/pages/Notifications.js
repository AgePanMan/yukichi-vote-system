import React, { useEffect, useState } from 'react';

function Notifications() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => setNotices(data));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">お知らせ</h2>
      <ul className="divide-y">
        {notices.map((n, i) => (
          <li key={i} className="py-2">
            <strong className="text-blue-600">[{n.type}]</strong> {n.message}
            <div className="text-sm text-gray-500">{new Date(n.timestamp).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
