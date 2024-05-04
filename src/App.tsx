import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { QueryClientProvider } from '@tanstack/react-query';
import Router from './routes';
import { queryClient } from './query/queryClient';

function App() {
  const notistackRef = React.createRef<any>();

  const onClickDismiss = (key: any) => () => {
    if (!notistackRef?.current) return;
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        ref={notistackRef}
        maxSnack={3}
        action={(key) => (
          <button type="button" onClick={() => onClickDismiss(key)}>
            닫기
          </button>
        )}
        autoHideDuration={5000}
      >
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
