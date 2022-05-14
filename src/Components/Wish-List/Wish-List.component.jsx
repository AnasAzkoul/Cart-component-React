import { useContext, useEffect } from "react"; 
import { wishListContext } from '../../contexts/wishList.context/wishList.context'; 
import { productsContext } from "../../contexts/products.context/products.context";

import './wish-list.styles.css'


const WishList = () => {
	const { wishList, productToWishList } = useContext(wishListContext); 
	const { products } = useContext(productsContext); 

	useEffect(() => {
		productToWishList(products)
	}, [products]); 

	return (
		<div className="wish-list-container">
		<h3>Welcome To Wish List</h3> 
		 {wishList.map(item => {
			 return (
				 <div key={item.id}>
				 	<span>{item.name}</span>
				 </div>
			 )
		 })}
		</div>
	)
}

export default WishList