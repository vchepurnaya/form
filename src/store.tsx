import React from 'react';
import { useLocalStore } from 'mobx-react';

type ContextType = {
  firstName: string;
  lastName: string;
  addFirstName: (firstName: string) => void;
  addLastName: (lastName: string) => void;
};

export const StoreContext = React.createContext<ContextType>({
  firstName: '',
  lastName: '',
  addFirstName: (firstName: string) => firstName,
  addLastName: (lastName: string) => lastName,
});

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(() => ({
    firstName: '',
    lastName: '',
    addFirstName: (firstName: string) => {
      store.firstName = firstName;
    },
    addLastName: (lastName: string) => {
      store.lastName = lastName;
    },
  }));

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
