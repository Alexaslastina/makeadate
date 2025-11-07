import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Use the base path from Vite's configuration
// This will be '/' for local development and '/makeadate/' for GitHub Pages
const basename = import.meta.env.BASE_URL;

root.render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App/>
    </BrowserRouter>
  </StrictMode>
);