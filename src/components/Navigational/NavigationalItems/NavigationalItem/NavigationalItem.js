import React from 'react';
import classes from './NavigationalItem.css';
import {NavLink} from 'react-router-dom';
const navigationItem=(props)=>{
return (
		<li className={classes.NavigationalItem}>
		<NavLink 
		exact={props.exact}
		activeClassName={classes.active}
		 to={props.link}
		 onClick={props.slideClick}>
		{props.children}
		</NavLink></li>
	);
}
export default navigationItem;