import React from 'react';
import classes from './order.css';

const order=(props)=>{
	const ingredients=[];

	for(let ingName in props.ingredients){
		ingredients.push({
			name:ingName,
			amount:props.ingredients[ingName]
		});
	}
const ingOutput=ingredients.map((ig,index)=>{
	return(<span 
		key={index}
		style={{textTransform:'capitalize',
				display:'inline-block',
				margin:'0 8px',
				border:'1px solid #eee',
				padding:'5px'	}} >
		{ig.name} ({ig.amount})
		</span>);
});

return(
	<div className={classes.Order}>
		<p>Ingredients:{ingOutput}</p>
		<p>Price:<strong>{props.price}</strong></p>
	</div>
	);
}

export default order;