import React, { useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminGate({ children }) {
  const { isAdmin, verifyAdmin } = useAdmin();

  useEffect(() => {
    verifyAdmin();
  }, []);

  if (!isAdmin) {
    return <div className="p-6 text-red-500">管理者権限が必要です。</div>;
  }

  return children;
}
