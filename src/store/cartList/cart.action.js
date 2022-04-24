import { createAction } from "../../Assets/Utils/Reducer/createAction";
import { CART_LIST_ACTION_TYPES } from "./cart.types";

///////////////////Helper Functions////////////////////////////////////////////////////
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


///////////////////////////////////////////////////////////////////////


export const productToAdd = (cartList, product) => {
	const newCartList = addProductToList(cartList, product)
	return createAction(CART_LIST_ACTION_TYPES.SET_CART_LIST, newCartList)  
}; 

export const decrement = (cartList, productToDecrease) => {
	const newCartList = decrementQuantity(cartList, productToDecrease)
	return createAction(CART_LIST_ACTION_TYPES.SET_CART_LIST, newCartList) 
};

export const clearProduct = (cartList, productToDelete) => {
	const newCartList = deleteProduct(cartList, productToDelete); 
	return createAction(CART_LIST_ACTION_TYPES.SET_CART_LIST, newCartList)  
}

export const toggleCart = () => {
	return createAction(CART_LIST_ACTION_TYPES.TOGGLE_CART); 
}