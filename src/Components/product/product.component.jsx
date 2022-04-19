import React, { useContext } from 'react'; 
import { cartListContext } from '../../contexts/Cart-items.Context/Cart-items.context';

import './product.styles.css'; 

const Product = ({ product }) => {
	const { name } = product; 
	const { productToAdd } = useContext(cartListContext); 

	const addProductToCart = () => {
		productToAdd(product); 
	}

  return (
	  <div className='product-container'>
		  <span>{name}</span>
		  <button onClick={addProductToCart}>Add to cart</button>
	  </div>
  )
}

export default Product