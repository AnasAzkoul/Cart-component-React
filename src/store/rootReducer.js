import { combineReducers } from "redux";
import { cartListReducer } from "./cartList/cart.reducer";

export const rootReducer = combineReducers({
	cart: cartListReducer, 
}); 

