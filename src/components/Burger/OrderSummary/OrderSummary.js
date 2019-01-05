import React, { Component } from 'react';
import Aux from '../../../hoc/Auxilary'
import Button from '../../UI/Button/Button'
class OrderSummary extends Component{
	componentWillUpdate(){
		console.log("OrderSummary Update");
	}

	render(){
		const listIngregdient=Object.keys(this.props.ingredients).map(key=>{
			return <li key={key}><span style={{textTransform:'capitalize'}}>{key}</span> : {this.props.ingredients[key]}</li>
		});
		return (
			<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with specific ingredients</p>
			<ul>{listIngregdient}</ul>
			<p><strong>Total Price : {this.props.price}</strong></p>
			<p>Continue to Checkout?</p>
			<Button type='Danger' click={this.props.clickCancel}>CANCEL</Button>
			<Button type='Success' click={this.props.clickContinue}>CONTINUE</Button>
			</Aux>
			);
	}

}

export default OrderSummary;