import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './shared/i18n/i18n';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from './app/ThemeProvider';
import { ErrorFallback } from './shared/ui';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
);
