import * as actionTypes from './action';

const PRICE_INGREDIENT={
	'Salad':8,
	'Tikki':15,
	'Meat':30,
	'Cheese':10,
};

const initialState={
	ingredients:{
		Cheese:0,
		Meat:0,
		Salad:0,
		Tikki:0
	},
	price:15
};

const reducer=(state=initialState,action)=>{
	switch(action.type){
		case actionTypes.ADD_INGREDIENT:
		return{
			...state,
			ingredients:{
				...state.ingredients,
				[action.ingName]:state.ingredients[action.ingName]+1
			},
			price:state.price+PRICE_INGREDIENT[action.ingName]
		};
		case actionTypes.REMOVE_INGREDIENT:
		return{
			...state,
			ingredients:{
				...state.ingredients,
				[action.ingName]:state.ingredients[action.ingName]-1
			},
			price:state.price-PRICE_INGREDIENT[action.ingName]
		};
		default: return state;
	}
}

export default reducer;