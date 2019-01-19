import React from 'react';
import BuildConrol from './BuildControl/BuildControl.js';
import classes from './BuildControllers.css';
const buildControllers=(props)=>{
	const controls=[
					{label:'Salad', type:'Salad'},
					{label:'Cheese', type:'Cheese'},
					{label:'Tikki', type:'Tikki'},
					{label:'Meat', type:'Meat'}
					];
	return(
		<div className={classes.BuildControls}> 
		<p>Price : {props.price}</p>
			{controls.map(ctrl=>{
				return (<BuildConrol 
					key={ctrl.label} 
					label={ctrl.label}
					disable={props.disable[ctrl.type]} 
					addclick={()=>props.addIng(ctrl.type)}
					subclick={()=>props.subIng(ctrl.type)}/>);
			})}
			<button 
			className={classes.OrderButton} 
			disabled={!props.purchasable} 
			onClick={props.orderClick}>
			{props.isauth?'Order Now':'Login to Order'}
			</button>
		</div>
		);

}

export default buildControllers;