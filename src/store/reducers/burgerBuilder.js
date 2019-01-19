import * as actionTypes from '../actions/actionTypes.js';
import {updateObject} from '../utility.js';

const PRICE_INGREDIENT={
	'Salad':8,
	'Tikki':15,
	'Meat':30,
	'Cheese':10,
};

const initialState={
	ingredients:null,
	price:15,
	error:false,
	building:false
};

const addIngredient=(state,action)=>{
	const updatedIngredient=updateObject(state.ingredients,
		{[action.ingName]:state.ingredients[action.ingName]+1});
	const updatedState={
		ingredients:updatedIngredient,
		price:state.price + PRICE_INGREDIENT[action.ingName],
		building:true
	};
	return updateObject(state,updatedState);
};

const removeIngredient=(state,action)=>{
	const updatedIng=updateObject(state.ingredients,
		{[action.ingName]:state.ingredients[action.ingName]-1});
	const updatedSt={
		ingredients:updatedIng,
		price:state.price-PRICE_INGREDIENT[action.ingName],
		building:true
	};
	return updateObject(state,updatedSt);
};

const setIngredient=(state,action)=>{
	return updateObject(state,
		{	ingredients:action.ingredients,
			price:15,
			error:false,
			building:false
		});
};

const fetchIngredientFailed=(state,action)=>{
	return updateObject(state,{error:true});
};

const reducer=(state=initialState,action)=>{
	switch(action.type){

		case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
		case actionTypes.REMOVE_INGREDIENT:return removeIngredient(state,action);
		case actionTypes.SET_INGREDIENT:return setIngredient(state,action);
		case actionTypes.FETCH_INGREDIENT_FAILED:return fetchIngredientFailed(state,action);
		default: return state;

	}
}

export default reducer;