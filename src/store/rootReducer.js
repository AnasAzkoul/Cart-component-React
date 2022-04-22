import { combineReducers } from "redux";
import { cartListReducer } from "./cartList/cartReducer";

export const rootReducer = combineReducers({
	cart: cartListReducer, 
}); 

