import React, { useContext } from 'react'; 
import { cartListContext } from '../../contexts/Cart-items.Context/Cart-items.context';
import { productsContext } from '../../contexts/products.context/products.context';
import { ReactComponent as WishListIcon } from '../../Assets/heart-svgrepo-com.svg';

import './product.styles.css'; 

const Product = ({ product }) => {
	const { name, isWishList } = product; 
	const { productToAdd } = useContext(cartListContext); 
	const { productToWishList } = useContext(productsContext); 

	const addProductToCart = () => {
		productToAdd(product); 
	}

	const addProductToWishList = () => {
		productToWishList(product)
	}

  return (
	  <div className='product-container'>
		  <span>{name}</span>
		  <button onClick={addProductToCart}>Add to cart</button>
		  <svg className='heart-icon-container'>
		  	<WishListIcon className='wish-list-icon'/>
		  </svg>
		  <button 
			onClick={addProductToWishList }
			>{
				!isWishList ? 
				'Add Product To Wish List' : 'Remove Product From Wish List'
				}
			</button>
	  </div>
  )
}

export default Product