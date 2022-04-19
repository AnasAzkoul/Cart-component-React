import { createContext, useReducer } from "react";



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
	toggleCart: () => { },
	productToAdd: () => { },
	decrement: () => { },
	clearProduct: () => { },
	totalQuantity: 0,
	setTotalQuantity: () => { },
	totalPrice: 0,
	setTotalPrice: () => { }
}); 

const CART_ACTION_TYPES = {
	SET_CART_LIST: 'SET_CART_LIST', 
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}


const CartListReducer = (state, action) => {
	const { type, payload } = action; 

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_LIST: 
			return {
				...state, 
				...payload, 
			}
		case CART_ACTION_TYPES.SET_IS_CART_OPEN: 
			return {
				...state, 
				isCartOpen: !state.isCartOpen, 
			}
		
		default:
			return state; 
	}
}

const INITIAL_STATE = {
	cartList: [], 
	totalQuantity: 0, 
	totalPrice: 0, 
	isCartOpen: false, 
}

export const CartListProvider = ({ children }) => {
	const [{
		cartList,
		totalQuantity,
		totalPrice,
		isCartOpen
	}, disppatch] = useReducer(CartListReducer, INITIAL_STATE); 
	
	const SetCartListHandler = (newCartList) => {
		const newTotalQuantity = newCartList.reduce((total, item) => total += item.quantity, 0);

		const newTotalPrice = newCartList.reduce((total, item) => total += item.quantity * item.price, 0);

		disppatch({
			type: CART_ACTION_TYPES.SET_CART_LIST,
			payload: {
				cartList: newCartList,
				totalQuantity: newTotalQuantity,
				totalPrice: newTotalPrice
			}
		})
	}

	const productToAdd = (product) => {
		const newCartList = (addProductToList(cartList, product)); 
		SetCartListHandler(newCartList); 
	}; 

	const decrement = (productToDecrease) => {
		const newCartList = (decrementQuantity(cartList, productToDecrease));
		SetCartListHandler(newCartList); 
	}

	const clearProduct = (productToDelete) => {
		const newCartList = (deleteProduct(cartList, productToDelete)); 
		SetCartListHandler(newCartList); 
	}

	const toggleCart = () => {
		disppatch({
			type: CART_ACTION_TYPES.SET_IS_CART_OPEN})
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