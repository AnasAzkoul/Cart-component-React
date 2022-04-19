import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartListProvider } from './contexts/Cart-items.Context/Cart-items.context';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartListProvider>
      <App />
    </CartListProvider>
  </React.StrictMode>
);


