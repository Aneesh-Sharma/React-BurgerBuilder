import * as actionTypes from './actionTypes.js';
import axios from 'axios';

export const authStart=()=>{
	return{
		type:actionTypes.AUTH_START
	};
};

export const authSuccess=(authData)=>{
	return{
		type:actionTypes.AUTH_SUCCESS,
		idToken:authData.localId,
		token:authData.idToken
	};
};

export const authFail=(error)=>{
	return{
		type:actionTypes.AUTH_FAIL,
		error:error
	};
};

export const checkAuthTimeout=(expiresIn)=>{
	return dispatch=>{
		setTimeout(()=>{
			dispatch(logOut());
		},expiresIn*1000);
	}
};

export const logOut=()=>{
	return{
		type:actionTypes.AUTH_LOGOUT,
	};
};

export const auth=(email,password,isSignUp)=>{
	return dispatch=>{
		dispatch(authStart());
		const authData={
			email:email,
			password:password,
			returnSecureToken:true
		}
		let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAjuctAgkQCB2DL743SA2WbKgIMoQb-nSg';
		if(!isSignUp){
			url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAjuctAgkQCB2DL743SA2WbKgIMoQb-nSg';
		}
		axios.post(url,authData)
		.then(response=>{
			dispatch(authSuccess(response.data));
			dispatch(checkAuthTimeout(response.data.expiresIn));
		})
		.catch(error=>{dispatch(authFail(error.response.data.error))});
	};
};

