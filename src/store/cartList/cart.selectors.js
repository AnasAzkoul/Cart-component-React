import { createSelector } from "reselect";

const cartListSelectorReducer = state => state.cart; 

export const selectCartList = createSelector(
	[cartListSelectorReducer], 
	(cart) => cart.cartList
); 


export const selectIsCartOpen = createSelector(
	[cartListSelectorReducer], 
	(cart) => cart.isCartOpen
); 

export const selectCartTotal = createSelector(
	[selectCartList], 
	(cartList) => cartList
	.reduce((total, product) => total += product.quantity, 0)
); 

export const selectCartTotalPrice = createSelector(
	[selectCartList], 
	(cartList) => cartList
	.reduce((total, product) => total += product.price * product.quantity, 0)
);


