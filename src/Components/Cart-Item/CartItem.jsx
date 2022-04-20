import React, {useContext} from 'react'; 
import { cartListContext } from '../../contexts/Cart-items.Context/Cart-items.context';

import './CartItem.styles.css'

const CartItem = ({ item }) => {
	const { name, quantity, price } = item; 
	const {
		productToAdd,
		decrement,
		clearProduct,
	} = useContext(cartListContext); 
	
	const incrementHandler = () => {
		productToAdd(item);
	}

	const decrementHandler = () => {
		decrement(item); 
	}

	const clearHandler = () => {
		clearProduct(item); 
	}


  return (
	  <div className='cartItem-container'>
		  <span className='name'>{name}</span>

		  <div className='quantity'>
			  <button onClick={incrementHandler}>+</button>
				<span>{quantity}</span>
			  <button onClick={decrementHandler}>-</button>
		  </div>

		  <span>{price}</span>
		  <button onClick={clearHandler}>X</button>
	  </div>
  )
}

export default CartItem;