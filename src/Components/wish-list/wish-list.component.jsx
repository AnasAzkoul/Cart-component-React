import { useContext, useEffect } from "react";
import { wishListContext } from "../../contexts/wish-list.context/wish-list.context";
import { productsContext } from "../../contexts/products-context /products.context";

import './wish.list.styles.css'

const WishList = () => {
	const {wishList, addToWishList} = useContext(wishListContext); 
	const { products } = useContext(productsContext); 

	useEffect(() => {
		addToWishList(products)
	}, [products]); 
	
	console.log(products)
	console.log(wishList)

	return (
		<div className="wish-list-container">
			{
				wishList.map(item => {
					return (
						<div key={item.id}>
							<span>{item.name}</span>
						</div>
					)
				})
			}
		</div>
	)
}

export default WishList