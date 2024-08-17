import 'primeicons/primeicons.css'; // Icons
import 'primereact/resources/primereact.min.css'; // Core Styles
import 'primereact/resources/themes/md-dark-indigo/theme.css'; //Theme
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
