import { selectCartList } from '../../store/cartList/cart.selectors';
import { useSelector } from 'react-redux';

import CartItem from '../Cart-Item/CartItem'
import './Cart.styles.css'

const Cart = () => {

	const cartList = useSelector(selectCartList); 

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