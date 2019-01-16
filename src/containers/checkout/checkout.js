import React, { Component } from 'react';
import CheckoutSummary from '../../components/order/CheckoutSummary/CheckoutSummary.js';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './contactData/contactData.js';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index.js';
class Checkout extends Component{
	// state={
	//	ingredient:null
	// 	price:0
	// }
	// componentWillMount(){
	// 	const query= new URLSearchParams(this.props.location.search);
	// 	const ingredients={};
	// 	let price=0;
	// 	for(let param of query.entries()){
	// 		if(param[0]==='price'){
	// 			price=+param[1];
	// 		}else{
	// 			ingredients[param[0]]=+param[1];
	// 		}

	// 	}
	// 	console.log(ingredients);
	// 	this.setState({ingredients:ingredients ,price:price});
	// }
    checkoutCancelHandler=()=>{
		this.props.history.goBack();
	}
	checkoutContinueHandler=()=>{
		this.props.history.replace('/checkout/contact-data');
	}
	render(){
		let summary=<Redirect to="/" />;
		if(this.props.ing){
			const purchased=this.props.purchased?<Redirect to="/"/>:null;
			summary=(<div>
			    {purchased}
				<CheckoutSummary ingredients={this.props.ing}
				checkoutCancelHandler={this.checkoutCancelHandler}
				checkoutContinueHandler={this.checkoutContinueHandler} />
				<Route path={this.props.match.path +"/contact-data"}
				component={ContactData}/>
				</div>);
		}

		return summary;
	}

	//<Route path={this.props.match.path +"/contact-data"}
	//render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)}/>
}

const mapStatetoProps=state=>{
	return{
		ing:state.burgerBuilder.ingredients,
		price:state.burgerBuilder.price,
		purchased:state.order.purchased
	};
};


export default connect(mapStatetoProps)(Checkout);