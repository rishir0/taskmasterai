import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './components/Login';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login />
  </StrictMode>
);
