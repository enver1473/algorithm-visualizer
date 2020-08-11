import React from 'react';
import Layout from './App/Layout';
import ContextProvider from './Context/Provider';
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
