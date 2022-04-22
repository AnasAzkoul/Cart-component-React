import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartListProvider } from './contexts/Cart-items.Context/Cart-items.context';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <CartListProvider>
          <App />
        </CartListProvider>
      </Provider>
  </React.StrictMode>
);


