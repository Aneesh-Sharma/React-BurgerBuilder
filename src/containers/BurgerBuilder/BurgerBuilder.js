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
import * as actions from '../../store/actions/index.js';

export class BurgerBuilder extends Component {
	state={
		purchased:false,
		loading:false
	}

	setPurchasble=(newIngredients)=>{
		const sum=Object.keys(newIngredients).map(key=>{
			return newIngredients[key];
		}).reduce((acc,curr)=>{ 
			return acc+curr},0);
		
		return sum>0;
		
	}
	setPurchased=()=>{
		if(this.props.isauth){
			this.setState({purchased:true});
		}else{
			this.props.setAuthRedirect('/checkout');
			this.props.history.push('/auth');
		}
		
	}

	setPurchasedCanceled=()=>{
		this.setState({
			purchased:false
		});
	}
	purchasedContinueHandler=()=>{
		this.props.onBurgerPurchaseInit();
		this.props.history.push('/checkout');
	}
	componentDidMount(){
		
		this.props.onInitIngredients();
		
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
				subIng={this.props.onIngredientRemoved}
				isauth={this.props.isauth}/>
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
			{this.props.error? 'Problem in fetching ingredients':burger}
			</Aux>
			);
	}
}

const mapStatetoProps=state=>{
	return{
		ing:state.burgerBuilder.ingredients,
		price:state.burgerBuilder.price,
		error:state.burgerBuilder.error,
		isauth:state.auth.token!=null
	};
}

const mapDispatchtoProps=dispatch=>{
	return{
		onIngredientAdded:(ingName)=>dispatch(actions.addIngredeint(ingName)),
		onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredeint(ingName)),
		onInitIngredients:()=>dispatch(actions.initIngredeint()),
		onBurgerPurchaseInit:()=>dispatch(actions.burgerPurchaseInit()),
		setAuthRedirect:(path)=>dispatch(actions.setAuthRedirect(path))
	};
}

export default connect(mapStatetoProps,mapDispatchtoProps)(WithErrorHandler(BurgerBuilder,axios));