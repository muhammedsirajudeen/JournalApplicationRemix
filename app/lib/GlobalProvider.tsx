import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StoreState {
  authenticated: boolean;
  setAuth: (status:boolean) => void;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

    const setAuth=(authStatus:boolean)=>setAuthenticated(authStatus)
  return (
    <StoreContext.Provider value={{ authenticated, setAuth }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreState => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
