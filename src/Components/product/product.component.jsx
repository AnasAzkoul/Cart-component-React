import { useDispatch, useSelector } from 'react-redux';
import { productToAdd } from '../../store/cartList/cart.action';
import { selectCartList } from '../../store/cartList/cart.selectors';

import './product.styles.css'; 

const Product = ({ product }) => {
	const { name } = product; 
	const dispatch = useDispatch(); 
	const cartList = useSelector(selectCartList)

	const addProductToCart = () => {
		dispatch(productToAdd(cartList, product)); 
	}

  return (
	  <div className='product-container'>
		  <span>{name}</span>
		  <button onClick={addProductToCart}>Add to cart</button>
	  </div>
  )
}

export default Product