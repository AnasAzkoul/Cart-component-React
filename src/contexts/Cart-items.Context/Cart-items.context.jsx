import { createContext, useReducer } from "react";
import { createAction } from "../../Assets/Utils/Reducer/createAction";

// Adding new / exisiting product to the list. 
const addProductToList = (cartList, productToAdd) => {
	// check if the product already axists, 
	const existingProduct = cartList.find(product => product.id === productToAdd.id); 
	// if that's true, return the product with increased quantity,
	if (existingProduct) {
		return cartList.map(item => item.id === productToAdd.id ?
			({ ...item, quantity: item.quantity + 1 }) : item); 
	}

	// if it doens't exist, return the new product with quantity equals to 1, 
	return [...cartList, { ...productToAdd, quantity: 1 }]; 
}; 

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

const CART_LIST_ACTION_TYPES = {
	SET_CART_LIST: 'SET_CART_LIST',
	TOGGLE_CART: 'TOGGLE_CART', 
	CART_TOTAL: 'CART_TOTAL', 
	CART_TOTAL_PRICE: 'CART_TOTAL_PRICE', 
}


const INITIAL_STATE = {
	cartList: [], 
	isCartOpen: false, 
	totalQuantity: 0, 
	totalPrice: 0, 
}; 


const cartListReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_LIST_ACTION_TYPES.SET_CART_LIST:
			return {
				...state, 
				...payload
			}
		case CART_LIST_ACTION_TYPES.TOGGLE_CART: 
			return {
				...state, 
				isCartOpen: !state.isCartOpen
			}

		default:
			return state;
	}
}; 



export const CartListProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartListReducer, INITIAL_STATE); 
	const { cartList, isCartOpen, totalQuantity, totalPrice } = state; 

	const updateCartListReducer = (cartList) => {
		const newCartTotal = cartList
		.reduce((total, product) => total += product.quantity, 0);

		const newTotalPrice = cartList
		.reduce((total, product) => total += product.price * product.quantity, 0);

		const payload = {
			cartList, 
			totalQuantity: newCartTotal, 
			totalPrice: newTotalPrice, 
		}

		dispatch(createAction(CART_LIST_ACTION_TYPES.SET_CART_LIST, payload)); 
	}

	const toggleCart = () => {
		dispatch(createAction(CART_LIST_ACTION_TYPES.TOGGLE_CART)) 
	}

	const productToAdd = (product) => {
		const newCartList = addProductToList(cartList, product)
		updateCartListReducer(newCartList);  
	}; 

	const decrement = (productToDecrease) => {
		const newCartList = decrementQuantity(cartList, productToDecrease)
		updateCartListReducer(newCartList); 
	};

	const clearProduct = (productToDelete) => {
		const newCartList = deleteProduct(cartList, productToDelete); 
		updateCartListReducer(newCartList);  
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