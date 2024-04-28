import React from 'react';
import './App.css';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
