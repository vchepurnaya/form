import React from 'react';
import Form from './components/form';
import { StoreProvider } from './store';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Form />
    </StoreProvider>
  );
};

export default App;
