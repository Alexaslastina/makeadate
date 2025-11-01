import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Use /makeadate/ basename for production (GitHub Pages)
const basename = import.meta.env.PROD ? '/makeadate' : '/';

root.render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App/>
    </BrowserRouter>
  </StrictMode>
);