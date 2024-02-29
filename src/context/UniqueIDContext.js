import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const UniqueIdContext = createContext();

export const useUniqueId = () => useContext(UniqueIdContext);

export const UniqueIdProvider = ({ children }) => {
  const [uniqueId, setUniqueId] = useState('');

  useEffect(() => {
    const id = uuidv4();
    setUniqueId(id);
  }, []);

  return (
    <UniqueIdContext.Provider value={uniqueId}>
      {children}
    </UniqueIdContext.Provider>
  );
};
