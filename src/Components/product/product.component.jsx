import React, { useContext } from 'react'; 
import { cartListContext } from '../../contexts/Cart-items.Context/Cart-items.context';
import { productsContext } from '../../contexts/products-context /products.context';

import './product.styles.css'; 

const Product = ({ product }) => {
	const { name, isWishList } = product; 
	const { productToAdd } = useContext(cartListContext); 
	const { productToWishList } = useContext(productsContext)

	const addProductToCart = () => {
		productToAdd(product); 
	}

	const addToWishListHandler = () => {
		productToWishList(product)
	}

  return (
	  <div className='product-container'>
		  <span>{name}</span>
		  <button onClick={addProductToCart}>Add to cart</button>
		  <button onClick={addToWishListHandler}>{!isWishList ? 
			'Add To Wish List' : 'Remove from Wish List'}
			</button>
	  </div>
  )
}

export default Product