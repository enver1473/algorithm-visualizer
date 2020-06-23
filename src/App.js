import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './App/Routes';
import { Provider as ContextProvider } from './App/context/sortingContext';

function App() {
  return (
    <div className='App'>
      <ContextProvider>
        <Router>
          <Routes />
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
