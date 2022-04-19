import { createContext, useState, useEffect } from "react";



// Adding new / exisiting product to the list. 
const addProductToList = (cartList, productToAdd) => {
	// check if the product already axists, 
	const existingProduct = cartList.find(product => product.id === productToAdd.id); 
	// if that's true, return the product with increased quantity,
	if (existingProduct) {
		return cartList.map(product => ({ ...product, quantity: product.quantity + 1 })); 
	}

	// if it doens't exist, return the new product with quantity equals to 1, 
	return [...cartList, { ...productToAdd, quantity: 1 }]; 
}
// increment existing product
const increaseQuantity = (cartList, productToIncrease) => {
	return cartList.map(item => {
		if (item.id === productToIncrease.id) {
			return ({...productToIncrease, quantity: productToIncrease.quantity + 1})
		}
		return item; 
	})
}

// decreasing quantity on an existing product; 
const decrementQuantity = (productList, productToDecrease) => {
	if (productToDecrease.quantity > 1) {
		return productList.map(product => {
			if (product.id === productToDecrease.id) {
				return ({...productToDecrease, quantity: productToDecrease.quantity - 1})
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
	increment: () => {}, 
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

	const increment = (product) => {
		setCartList(increaseQuantity(cartList, product))
	}

	const decrement = (productToDecrease) => {
		setCartList(decrementQuantity(cartList, productToDecrease));
	}

	const clearProduct = (productToDelete) => {
		setCartList(deleteProduct(cartList, productToDelete)); 
	}

	useEffect(() => {
		setTotalQuantity(cartList
			.reduce((total, product) => total += product.quantity, 0))
	}, [cartList])

	useEffect(() => {
		setTotalPrice(cartList
			.reduce((total, product) => total += product.price * product.quantity, 0))
	}, [cartList]); 

	const toggleCart = () => {
		setIsCartOpen(!isCartOpen); 
	}
	
	const value = {
		cartList, 
		isCartOpen, 
		toggleCart,
		productToAdd, 
		increment, 
		decrement, 
		clearProduct, 
		totalQuantity, 
		totalPrice, 
	}
	return <cartListContext.Provider value={value}>{children}</cartListContext.Provider>
}