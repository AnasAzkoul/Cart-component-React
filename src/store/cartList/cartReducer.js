import { CART_LIST_ACTION_TYPES } from "./cart.types";

export const INITIAL_STATE = {
	cartList: [], 
	isCartOpen: false, 
	totalQuantity: 0, 
	totalPrice: 0, 
}; 


export const cartListReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_LIST_ACTION_TYPES.SET_CART_LIST:
			return {
				...state, 
				cartList: payload
			}
		case CART_LIST_ACTION_TYPES.TOGGLE_CART: 
			return {
				...state, 
				isCartOpen: !state.isCartOpen
			}
		case CART_LIST_ACTION_TYPES.CART_TOTAL:
			return {
				...state, 
				totalQuantity: payload
			}
		case CART_LIST_ACTION_TYPES.CART_TOTAL_PRICE: 
			return {
				...state, 
				totalPrice: payload
			}
		default:
			return state;
	}
}; 
