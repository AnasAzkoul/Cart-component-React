import { createContext, useReducer } from "react";
import { createAction } from "../../Assets/Utils/Reducer/createAction";

const productToWishList = (products) => {
	return products.filter(product => product.isWishList === true); 
}; 

// context 
export const wishListContext = createContext({
	wishList: [], 
	addToWishList: () => {}, 
	isWishListOpen: false, 
	toggleWishList: () => {}
})
// reducer 
const WISH_LIST_ACTION_TYPES = {
	SET_WISH_LIST: 'SET_WISH_LIST', 
	TOGGLE_WISH_LIST: 'TOGGLE_WISH_LIST', 
}

const STATE_INITIAL_VALUE = {
	wishList: [], 
	isWishListOpen: false
}

const wishListReducer = (state, action) => {
	const {type, payload} = action; 

	switch(type) {
		case WISH_LIST_ACTION_TYPES.SET_WISH_LIST: 
			return {
				...state, 
				wishList: payload
			}
		case WISH_LIST_ACTION_TYPES.TOGGLE_WISH_LIST: 
			return {
				...state, 
				isWishListOpen: !state.isWishListOpen
			}
		default: 
			return state
	}
}

export const WishListProvider = ({children}) => {
	const [state, dispatch] = useReducer(wishListReducer, STATE_INITIAL_VALUE); 
	const { wishList, isWishListOpen } = state; 

	const addToWishList = (products) => {
		const newWishList = productToWishList(products); 
		dispatch(createAction(	WISH_LIST_ACTION_TYPES.SET_WISH_LIST, newWishList))
	}

	const toggleWishList = () => {
		dispatch(createAction(WISH_LIST_ACTION_TYPES.TOGGLE_WISH_LIST))
	}

	const value = {
		wishList, 
		isWishListOpen, 
		addToWishList, 
		toggleWishList
	}

	return (
		<wishListContext.Provider value={value}>{children}</wishListContext.Provider>
	)
}