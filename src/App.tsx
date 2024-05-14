import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import Router from './routes';
import { queryClient } from './apis/queryClient';
import { px } from './utils/styles';

function App() {
  const notistackRef = React.createRef<any>();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          ref={notistackRef}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          maxSnack={3}
          action={(key) => (
            <button
              type="button"
              style={{
                all: 'initial',
                color: '#fff',
                fontSize: px(12),
                paddingInline: px(8),
              }}
              onClick={() => closeSnackbar(key)}
            >
              닫기
            </button>
          )}
          autoHideDuration={3000}
        >
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </SnackbarProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
