import { createContext, useState } from "react";

const addTowishList = (productsList) => {
	return productsList.filter(product => {
		return product.isWishList === true; 
	})
}

export const wishListContext = createContext({
	wishList: [], 
	productToWishList: () => {},
	isWishListOpen: false, 
	toggleWishList: () => {},
})

export const WishListProvider = ({children}) => {
	const [wishList, setWishList] = useState([]); 
	const [isWishListOpen, setIsWishListOpen] = useState(false); 

	const productToWishList = (productsList) => {
		setWishList(addTowishList(productsList))
	}

	const toggleWishList = () => {
		setIsWishListOpen(!isWishListOpen); 
	}

	const value = {
		wishList, 
		isWishListOpen, 
		productToWishList,  
		toggleWishList
	}

	return (
		<wishListContext.Provider value= {value}>{children}</wishListContext.Provider>
	)
}