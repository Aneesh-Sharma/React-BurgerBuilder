import React from 'react';
import logoSrc from '../../assets/Images/burger-logo.png';
import classes from './Logo.css';
const logo = (props)=>{
return(
	<div className={classes.Logo}>
		<img src={logoSrc}/>
	</div>
	);
}
export default logo;