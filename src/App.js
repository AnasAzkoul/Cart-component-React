import { useContext } from 'react';
import { cartListContext } from './contexts/Cart-items.Context/Cart-items.context';
import { WishListProvider } from './contexts/wishList.context/wishList.context';
import { wishListContext } from './contexts/wishList.context/wishList.context';

import Cart from './Components/Cart-component/Cart.Component';
import WishList from './Components/Wish-List/Wish-List.component';
import ProductsList from './Components/Products-List/ProductsList.component';
import './App.css';

function App() {
  const {
    toggleCart,
    isCartOpen,
    totalQuantity,
    totalPrice,
  } = useContext(cartListContext); 

  const { toggleWishList, isWishListOpen, wishList } = useContext(wishListContext)

  const toggleHandler = () => {
    toggleCart(); 
  }

  const toggleWishListHandler = () => {
    toggleWishList(); 
  }

  return (
      <div className="App">
        <h1>Product List App With useState</h1>
        <span>You have {wishList.length} items on your wish list</span>
        {
          isWishListOpen ? 
          <button onClick={toggleWishListHandler}>close wish list</button> 
          : 
          <button onClick={toggleWishListHandler}>open wish list</button>
        }
        {isWishListOpen && <WishList />}
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
