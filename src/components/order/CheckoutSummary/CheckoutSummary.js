import React from 'react';
import Burger from '../../Burger/Burger.js';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary=(props)=>{
	return(
		<div className={classes.CheckoutSummary}>
		<h1>WE hope it tast well</h1>
		<div style={{width:'100%',margin:'auto'}}>
		<Burger ingredients={props.ingredients}/>
		<Button type='Danger' click={props.checkoutCancelHandler}>CANCEL</Button>
		<Button type='Success' click={props.checkoutContinueHandler}>CONTINUE</Button>
		</div>
		</div>
		);

}

export default checkoutSummary;