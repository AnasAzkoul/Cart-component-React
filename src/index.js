import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartListProvider } from './contexts/Cart-items.Context/Cart-items.context';
import { ProductProvider } from './contexts/products-context /products.context';
import { WishListProvider } from './contexts/wish-list.context/wish-list.context';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartListProvider>
        <ProductProvider>
          <WishListProvider>
            <App />
          </WishListProvider>
        </ProductProvider>
      </CartListProvider>
    </Provider>
  </React.StrictMode>
);


