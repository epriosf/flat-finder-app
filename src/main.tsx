import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css'; // Icons
import 'primereact/resources/primereact.min.css'; // Core Styles
//import 'primereact/resources/themes/md-dark-indigo/theme.css'; //Theme
import 'primereact/resources/themes/md-light-indigo/theme.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import GlobalStyles from './components/Commons/GlobalStyles.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyles />
    <App />
  </StrictMode>,
);
