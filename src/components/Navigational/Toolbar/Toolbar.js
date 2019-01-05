import React from 'react';
import classes from './Toolbar.css';
import DrawerToggle from '../../Navigational/SlideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';
import Navigation from '../../Navigational/NavigationalItems/NavigationalItems';
const toolbar=(props)=>{
return (
		<header className={classes.Toolbar}>
			<DrawerToggle click={props.toggleClicked}/>
			<div className={classes.Logo}><Logo/></div>
			<nav className={classes.DisplayOnly}><Navigation/></nav>
			
		</header>
	);
}
export default toolbar;