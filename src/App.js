import React from 'react';
import { Provider as ContextProvider } from './App/context/sortingContext';
import Layout from './App/Layout';
import './App.css';

function App() {
  return (
    <div className='App'>
      <ContextProvider>
        <Layout />
      </ContextProvider>
    </div>
  );
}

export default App;
