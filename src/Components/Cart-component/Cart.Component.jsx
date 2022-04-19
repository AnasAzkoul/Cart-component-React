import React, { useContext } from 'react'; 
import { cartListContext } from '../../contexts/Cart-items.Context/Cart-items.context';

import CartItem from '../Cart-Item/CartItem'
import './Cart.styles.css'

const Cart = () => {

	const {
		cartList, 
	} = useContext(cartListContext); 

	console.log(cartList)


  return (
	  <div className='cart-container'>
		  <h3>Welcome to Cart</h3>
		  {
			  cartList.map(item => {
				  return (
					  <div key={item.id}>
						  <CartItem item={item}/>
					  </div>
				  )
			  })
			}
	  </div>
  )
}

export default Cart