import { createContext, useReducer, useEffect } from "react";
import shopData from '../../Assets/Shop.data.json'; 
import { createAction } from "../../Assets/Utils/Reducer/createAction";

const addProductToWishList = (products, productToAdd) => {
	return products.map(product => product.id === productToAdd.id ? 
		{...product, isWishList: !product.isWishList} : product)
}


export const productsContext = createContext({
	products: [], 
	productToWishList: () => {}
}); 

const PRODUCT_ACTION_TYPES = {
	SET_PRODUCTS: 'SET_PRODUCTS'
}

const INITIAL_PRODUCT_STATE = {
	products: []
}	

const productReducer = (state, action) => {
	const {type, payload} = action; 

	switch(type){
		case PRODUCT_ACTION_TYPES.SET_PRODUCTS:
			return { 
				...state,
				products: payload
			}
		default: 
			return state
	}
}; 


export const ProductProvider = ({children}) => {
	const [state, dispatch] = useReducer(productReducer, INITIAL_PRODUCT_STATE); 
	const { products } = state; 

	useEffect(() => {
		dispatch(createAction(PRODUCT_ACTION_TYPES.SET_PRODUCTS, shopData ))
	}, [])

	console.log(products)

	const productToWishList = (productToAdd) => {
		const newProducts = addProductToWishList(products, productToAdd); 
		dispatch(createAction(PRODUCT_ACTION_TYPES.SET_PRODUCTS, newProducts))
	}

	const value = {
		products, 
		productToWishList
	}


	return (
		<productsContext.Provider value={value}>{children}</productsContext.Provider>
	)
}

