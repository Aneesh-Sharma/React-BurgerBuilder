import * as actionTypes from './actionTypes.js';
import axios from '../../axios-orders';

export const addIngredeint=(ingr)=>{
	return{
		type:actionTypes.ADD_INGREDIENT,
		ingName:ingr
	};
};

export const removeIngredeint=(ingr)=>{
	return{
		type:actionTypes.REMOVE_INGREDIENT,
		ingName:ingr
	};
};

export const fetchIngredientFailed=()=>{
	return {
		type:actionTypes.FETCH_INGREDIENT_FAILED
	};
}


export const setIngredeint=(ingr)=>{
	return {
		type:actionTypes.SET_INGREDIENT,
		ingredients:ingr
	};
};

export const initIngredeint=(ingr)=>{
	return dispatch=>{
		axios.get('https://my-react-burger-b178d.firebaseio.com/ingredients.json')
		.then(response=>{dispatch(setIngredeint(response.data))})
		.catch(error=>{dispatch(fetchIngredientFailed())});
};
};