import * as actionTypes from '../actions/actionTypes.js';
import {updateObject} from '../utility.js';
const initialState={
	orders:[],
	loading:false,
	purchased:false
};
const burgerPurchasedInit=(state,action)=>{
	return updateObject(state, {purchased:false});
};

const burgerPurchasedStart=(state,action)=>{
	return updateObject(state, {loading:true});
};

const burgerPurchasedSuccess=(state,action)=>{
	const newOrder={
			...action.orderData,
			id:action.orderId
		};
		return updateObject(state, {
			loading:false,
			purchased:true,
			orders:state.orders.concat(newOrder)
		});
};

const burgerPurchasedFailed=(state,action)=>{
	return updateObject(state,{
			loading:false
		});
};

const fetchOrderStart=(state,action)=>{
	return updateObject(state,{
			loading:true
		});
};

const fetchOrderFail=(state,action)=>{
	return updateObject(state,{
			loading:false,
		});
};

const fetchOrderSuccess=(state,action)=>{
	return updateObject(state,{
			loading:false,
			orders:action.orders
		});
};

const reducer=(state=initialState,action)=>{
	switch(action.type){
		case actionTypes.BURGER_PURCHASED_INIT:return burgerPurchasedInit(state,action);
		case actionTypes.BURGER_PURCHASED_START:return burgerPurchasedStart(state,action);
		case actionTypes.BURGER_PURCHASED_SUCCESS:return burgerPurchasedSuccess(state,action);
		case actionTypes.BURGER_PURCHASED_FAILED:return burgerPurchasedFailed(state,action);
		case actionTypes.FETCH_ORDER_START:return fetchOrderStart(state,action);
		case actionTypes.FETCH_ORDER_SUCCESS:return fetchOrderSuccess(state,action);
		case actionTypes.FETCH_ORDER_FAIL:return fetchOrderFail(state,action);
		default: return state;
	}
}

export default reducer;