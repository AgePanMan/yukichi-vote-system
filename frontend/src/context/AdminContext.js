import { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [address, setAddress] = useState(null);

  const verifyAdmin = async () => {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    setAddress(addr);

    const res = await fetch('/api/admin/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: addr })
    });
    const data = await res.json();
    setIsAdmin(data.isAdmin);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, address, verifyAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
