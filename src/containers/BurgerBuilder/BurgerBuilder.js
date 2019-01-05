import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger.js';
import Model from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControllers from '../../components/Burger/BuildControllers/BuildControllers.js';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/spinner/spinner.js';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';
const PRICE_INGREDIENT={
	'Salad':8,
	'Tikki':15,
	'Meat':30,
	'Cheese':10,
}
class BurgerBuilder extends Component {
	state={
		ingredients:null,
		price:15,
		purchasable:false,
		purchased:false,
		loading:false,
		error:false
	}

	setPurchasble=(newIngredients)=>{
		const sum=Object.keys(newIngredients).map(key=>{
			return newIngredients[key];
		}).reduce((acc,curr)=>{ 
			return acc+curr},0);
		this.setState({
			purchasable:sum>0
		});
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
		
		const queryParams=[];
		for(let i in this.state.ingredients){
			queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push(encodeURIComponent('price')+"="+encodeURIComponent(this.state.price));
		const queryString=queryParams.join('&');

		this.props.history.push({
			pathname:'/checkout',
			search:'?'+queryString
		});
	}

	addIngredientHandler=(type)=>{
		const newIngredients={...this.state.ingredients};
		const oldCount=this.state.ingredients[type];
		const newCount=oldCount+1;
		const newPrice=this.state.price+PRICE_INGREDIENT[type];
		newIngredients[type]=newCount;
		this.setState({
			ingredients:newIngredients,
			price:newPrice
		});
		this.setPurchasble(newIngredients);
	}
	removeIngredientHandler=(type)=>{
		const newIngredients={...this.state.ingredients};
		const oldCount=this.state.ingredients[type];
		const newCount=oldCount-1;
		const newPrice=this.state.price-PRICE_INGREDIENT[type];
		newIngredients[type]=newCount;
		this.setState({
			ingredients:newIngredients,
			price:newPrice
		});
		this.setPurchasble(newIngredients);
	}
	componentDidMount(){
		axios.get('https://my-react-burger-b178d.firebaseio.com/ingredients.json')
		.then(response=>{this.setState({ingredients:response.data})})
		.catch(error=>{this.setState({error:true})});
	}

	render(){
		const disable={...this.state.ingredients};
		for(let key in disable){
			disable[key]=disable[key]<=0;
		}
		let burger=<Spinner/>;
		let orderSummary;
		if(this.state.ingredients){
			burger=(
				<Aux>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControllers 
				disable={disable}
				purchasable={this.state.purchasable}
				price={this.state.price}
				addIng={this.addIngredientHandler} 
				orderClick={this.setPurchased}
				subIng={this.removeIngredientHandler}/>
				</Aux>
				);

			orderSummary=	<OrderSummary 
			ingredients={this.state.ingredients} 
			clickCancel={this.setPurchasedCanceled}
			clickContinue={this.purchasedContinueHandler}
			price={this.state.price} />;

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

export default WithErrorHandler(BurgerBuilder,axios);