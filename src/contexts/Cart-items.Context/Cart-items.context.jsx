import { createContext, useState, useEffect } from "react";



// Adding new / exisiting product to the list. 
const addProductToList = (cartList, productToAdd) => {
	// check if the product already axists, 
	const existingProduct = cartList.find(product => product.id === productToAdd.id); 
	// if that's true, return the product with increased quantity,
	if (existingProduct) {
		return cartList.map(product => product.id === productToAdd.id ?
			({ ...product, quantity: product.quantity + 1 }) : product); 
	}

	// if it doens't exist, return the new product with quantity equals to 1, 
	return [...cartList, { ...productToAdd, quantity: 1 }]; 
}

// decreasing quantity on an existing product; 
const decrementQuantity = (productList, productToDecrease) => {
	if (productToDecrease.quantity > 1) {
		return productList.map(product => {
			if (product.id === productToDecrease.id) {
				return ({ ...product, quantity: product.quantity - 1})
			}
			return product
		})
	} else {
		return productList.filter(product => product.id !== productToDecrease.id); 
	}
}; 

// deleting an existing product from the product list; 
const deleteProduct = (productList, productToDelete) => {
	return productList.filter(product => product.id !== productToDelete.id); 
}
// calculating total quanitity 




export const cartListContext = createContext({
	cartList: [], 
	isCartOpen: false, 
	toggleCart: () => {}, 
	productToAdd: () => { },  
	decrement: () => { }, 
	clearProduct: () => { }, 
	totalQuantity: 0, 
	setTotalQuantity: () => { }, 
	totalPrice: 0, 
	setTotalPrice: () => {}
})



export const CartListProvider = ({ children }) => {
	const [cartList, setCartList] = useState([]); 
	const [totalQuantity, setTotalQuantity] = useState(0); 
	const [totalPrice, setTotalPrice] = useState(0); 
	const [isCartOpen, setIsCartOpen] = useState(false); 

	const productToAdd = (product) => {
		setCartList(addProductToList(cartList, product))
	}; 

	const decrement = (productToDecrease) => {
		setCartList(decrementQuantity(cartList, productToDecrease));
	}

	const clearProduct = (productToDelete) => {
		setCartList(deleteProduct(cartList, productToDelete)); 
	}

	useEffect(() => {
		const newCartList = cartList.reduce((total, item) => total += item.quantity, 0);

		setTotalQuantity(newCartList)
	}, [cartList])

	useEffect(() => {
		const newCartList = cartList.reduce((total, item) => total += item.quantity * item.price, 0);

		setTotalPrice(newCartList)
	}, [cartList]); 

	const toggleCart = () => {
		setIsCartOpen(!isCartOpen); 
	}
	
	const value = {
		cartList, 
		isCartOpen, 
		toggleCart,
		productToAdd, 
		decrement, 
		clearProduct, 
		totalQuantity, 
		totalPrice, 
	}
	return <cartListContext.Provider value={value}>{children}</cartListContext.Provider>
}