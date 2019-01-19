import * as actionTypes from './actionTypes.js';
import axios from '../../axios-orders';

export const burgerPurchaseInit=()=>{
	return{
		type:actionTypes.BURGER_PURCHASED_INIT
	};
};

export const burgerPurchaseStart=()=>{
	return{
		type:actionTypes.BURGER_PURCHASED_START
	};
};

export const burgerPurchaseSuccess=(id,orderData)=>{
	return{
		type:actionTypes.BURGER_PURCHASED_SUCCESS,
		orderId:id,
		orderData:orderData
	};
};

export const burgerPurchaseFailed=(error)=>{
	return{
		type:actionTypes.BURGER_PURCHASED_FAILED,
		error:error
	};
};
export const burgerPurchase=(orderData,token)=>{
	return dispatch=>{
		dispatch(burgerPurchaseStart());
		axios.post('/orders.json?auth='+token,orderData)
		.then(response=>{
		//	console.log(response);
			dispatch(burgerPurchaseSuccess(response.data,orderData));
		})
		.catch(error=>{
		//	console.log(error);
			dispatch(burgerPurchaseFailed(error));
		});
	};
};

export const fetchOrderStart=()=>{
	return{
		type:actionTypes.FETCH_ORDER_START
	};
};

export const fetchOrderSuccess=(orders)=>{
	return{
		type:actionTypes.FETCH_ORDER_SUCCESS,
		orders:orders
	};
};

export const fetchOrderFailed=(error)=>{
	return{
		type:actionTypes.FETCH_ORDER_FAIL,
		error:error
	};
};

export const fetchOrder=(token,userId)=>{
	return dispatch=>{
		dispatch(fetchOrderStart());
		axios.get('/orders.json?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"')
		.then(res=>{
		//	console.log(res.data);
			const fetchData=[];
			for(let key in res.data){
				fetchData.push({
					...res.data[key],
					id:key
				});
			}
			dispatch(fetchOrderSuccess(fetchData));
			//this.setState({loading:false,orders:fetchData});
		})
		.catch(err=>{
		//	this.setState({loading:false});
			dispatch(fetchOrderFailed(err));
		});
	};
};