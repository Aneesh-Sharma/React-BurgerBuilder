import React from 'react';
import classes from './NavigationalItems.css';
import NavigationalItem from './NavigationalItem/NavigationalItem';
const navigation=(props)=>{
return (
		<ul className={classes.NavigationalItems}>
			<NavigationalItem link="/" exact slideClick={props.slideClick}>Burger Builder</NavigationalItem>
			<NavigationalItem link="/orders" slideClick={props.slideClick}>My Orders</NavigationalItem>
			{props.isauth?<NavigationalItem link="/logOut" slideClick={props.slideClick}>LogOut</NavigationalItem>:
			<NavigationalItem link="/auth" slideClick={props.slideClick}>Auth</NavigationalItem>}
		</ul>
	);
}
export default navigation;