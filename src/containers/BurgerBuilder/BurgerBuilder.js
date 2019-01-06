import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger.js';
import Model from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControllers from '../../components/Burger/BuildControllers/BuildControllers.js';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/spinner/spinner.js';
import {connect} from 'react-redux';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';
import * as actionTypes from '../../store/action';

class BurgerBuilder extends Component {
	state={
		purchased:false,
		loading:false,
		error:false
	}

	setPurchasble=(newIngredients)=>{
		const sum=Object.keys(newIngredients).map(key=>{
			return newIngredients[key];
		}).reduce((acc,curr)=>{ 
			return acc+curr},0);
		
			return sum>0;
		
	}
	setPurchased=()=>{
		this.setState({
			purchased:true
		});
	}

	setPurchasedCanceled=()=>{
		this.setState({
			purchased:false
		});
	}
	purchasedContinueHandler=()=>{
		
		// const queryParams=[];
		// for(let i in this.props.ing){
		// 	queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]));
		// }
		// queryParams.push(encodeURIComponent('price')+"="+encodeURIComponent(this.state.price));
		// const queryString=queryParams.join('&');

		// this.props.history.push({
		// 	pathname:'/checkout',
		// 	search:'?'+queryString
		// });

		this.props.history.push('/checkout');
	}

	// addIngredientHandler=(type)=>{
	// 	const newIngredients={...this.state.ingredients};
	// 	const oldCount=this.state.ingredients[type];
	// 	const newCount=oldCount+1;
	// 	const newPrice=this.state.price+PRICE_INGREDIENT[type];
	// 	newIngredients[type]=newCount;
	// 	this.setState({
	// 		ingredients:newIngredients,
	// 		price:newPrice
	// 	});
	// 	this.setPurchasble(newIngredients);
	// }
	// removeIngredientHandler=(type)=>{
	// 	const newIngredients={...this.state.ingredients};
	// 	const oldCount=this.state.ingredients[type];
	// 	const newCount=oldCount-1;
	// 	const newPrice=this.state.price-PRICE_INGREDIENT[type];
	// 	newIngredients[type]=newCount;
	// 	this.setState({
	// 		ingredients:newIngredients,
	// 		price:newPrice
	// 	});
	// 	this.setPurchasble(newIngredients);
	// }
	componentDidMount(){
		// axios.get('https://my-react-burger-b178d.firebaseio.com/ingredients.json')
		// .then(response=>{this.setState({ingredients:response.data})})
		// .catch(error=>{this.setState({error:true})});
	}

	render(){
		const disable={...this.props.ing};
		for(let key in disable){
			disable[key]=disable[key]<=0;
		}
		let burger=<Spinner/>;
		let orderSummary;
		if(this.props.ing){
			burger=(
				<Aux>
				<Burger ingredients={this.props.ing}/>
				<BuildControllers 
				disable={disable}
				purchasable={this.setPurchasble(this.props.ing)}
				price={this.props.price}
				addIng={this.props.onIngredientAdded} 
				orderClick={this.setPurchased}
				subIng={this.props.onIngredientRemoved}/>
				</Aux>
				);

			orderSummary=	<OrderSummary 
			ingredients={this.props.ing} 
			clickCancel={this.setPurchasedCanceled}
			clickContinue={this.purchasedContinueHandler}
			price={this.props.price} />;

			if(this.state.loading){
				orderSummary=<Spinner/>;
			}

		}
		
		return(
			<Aux>
			<Model 
			purchased={this.state.purchased} 
			clickBackdrop={this.setPurchasedCanceled}>
			{orderSummary}
			</Model>
			{this.state.error? 'Problem in fetching ingredients':burger}
			</Aux>
			);
	}
}

const mapStatetoProps=state=>{
	return{
		ing:state.ingredients,
		price:state.price
	};
}

const mapDispatchtoProps=dispatch=>{
	return{
		onIngredientAdded:(ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT,ingName:ingName}),
		onIngredientRemoved:(ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingName:ingName})
	};
}

export default connect(mapStatetoProps,mapDispatchtoProps)(WithErrorHandler(BurgerBuilder,axios));