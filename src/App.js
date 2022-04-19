import { useContext } from 'react';
import { cartListContext } from './contexts/Cart-items.Context/Cart-items.context';

import Cart from './Components/Cart-component/Cart.Component';
import ProductsList from './Components/Products-List/ProductsList.component';
import './App.css';

function App() {
  const {
    toggleCart,
    isCartOpen,
    totalQuantity,
    totalPrice,
  } = useContext(cartListContext); 


  const toggleHandler = () => {
    toggleCart(); 
  }

  

  return (
    <div className="App">
      <h1>Welcome to the Product List App With Reducer</h1>
      <div className='cart-info'>
        {
          isCartOpen ?
          <button onClick={toggleHandler}>Close Cart</button>
            : <button onClick={toggleHandler} >Open Cart</button>
        }
        <span>Total Quantity: {totalQuantity}</span>
        <span>Total Price: {totalPrice}</span>
      </div>
      {isCartOpen && <Cart/>}
      <ProductsList />
    </div>
  );
}

export default App;
