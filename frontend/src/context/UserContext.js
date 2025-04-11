import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState('user');
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      if (window.ethereum) {
        const [addr] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(addr);
        const res = await fetch('/api/user/role?address=' + addr);
        const data = await res.json();
        if (data.role) setRole(data.role);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ address, role }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
