import { useDispatch, useSelector } from 'react-redux';
import {selectIsCartOpen, selectCartTotal, selectCartTotalPrice} from './store/cartList/cart.selectors'; 
import {toggleCart} from './store/cartList/cart.action'

import Cart from './Components/Cart-component/Cart.Component';
import ProductsList from './Components/Products-List/ProductsList.component';
import './App.css';

function App() {

  const dispatch = useDispatch(); 
  const isCartOpen = useSelector(selectIsCartOpen); 
  const totalQuantity = useSelector(selectCartTotal); 
  const totalPrice = useSelector(selectCartTotalPrice)
  


  const toggleHandler = () => {
    dispatch(toggleCart()); 
  }

  

  return (
    <div className="App">
      <h1>Product List App With useReducer V2</h1>
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
