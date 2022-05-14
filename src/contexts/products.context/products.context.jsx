import { createContext, useEffect, useState } from 'react'; 

import productsList from '../../Assets/Shop.data.json'; 

const addtoWishListHandler = (products, productToAdd) => {
	return products.map(product => 
		product.id === productToAdd.id ? {...product, isWishList: !product.isWishList} : product)
}; 

export const productsContext = createContext({
	products: [], 
	setProducts: () => {},
	productToWishList: () => {}, 
})

export const ProductsProvider = ({children}) => {
	const [products, setProducts] = useState([]); 

	useEffect(() => {
		setProducts(productsList); 
	}, [])

	const productToWishList = (productToAdd) => {
		setProducts(addtoWishListHandler(products, productToAdd))
	}

	const value = {
		products, 
		setProducts, 
		productToWishList
	}



	return (
		<productsContext.Provider value = {value}>{children}</productsContext.Provider>
	)
}