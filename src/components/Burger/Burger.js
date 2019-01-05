import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient.js'
const burger=(props)=>{
let tansferIngredients = Object.keys(props.ingredients).map(igkey=>{
	return [...Array(props.ingredients[igkey])].map((_,i)=>{
		return <BurgerIngredient key={igkey+i} type={igkey}/>
	});
}).reduce((acc,curr)=>{
return acc.concat(curr);
},[]);

if(tansferIngredients.length===0){
tansferIngredients= <p>Please Start adding Ingredient</p>
}

return (
	<div className={classes.Burger}>
	<BurgerIngredient type="bread-top"/>
	 {tansferIngredients}
	<BurgerIngredient type="bread-bottom"/>
	</div>
	);
}

export default burger;