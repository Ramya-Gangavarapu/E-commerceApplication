// src/context/UserContext.js
import React, { createContext, useState } from 'react';

// Named export for UserContext
export const UserContext = createContext();

// Named export for UserProvider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};