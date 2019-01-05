import React from 'react';
import classes from './NavigationalItems.css';
import NavigationalItem from './NavigationalItem/NavigationalItem';
const navigation=(props)=>{
return (
		<ul className={classes.NavigationalItems}>
			<NavigationalItem link="/" exact>Burger Builder</NavigationalItem>
			<NavigationalItem link="/orders">My Orders</NavigationalItem>
		</ul>
	);
}
export default navigation;