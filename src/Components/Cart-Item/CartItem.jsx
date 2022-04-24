import { productToAdd, decrement, clearProduct } from '../../store/cartList/cart.action';
import { selectCartList } from '../../store/cartList/cart.selectors';

import { useDispatch, useSelector } from 'react-redux';

import './CartItem.styles.css'

const CartItem = ({ item }) => {
	const { name, quantity, price } = item; 
	const dispatch = useDispatch(); 
	const cartList = useSelector(selectCartList); 
	
	const incrementHandler = () => {
		dispatch(productToAdd(cartList, item));
	}

	const decrementHandler = () => {
		dispatch(decrement(cartList, item)); 
	}

	const clearHandler = () => {
		dispatch(clearProduct(cartList, item)); 
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