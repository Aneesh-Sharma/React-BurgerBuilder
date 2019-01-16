import React from 'react';
import classes from './SlideDrawer.css';
import Logo from '../../Logo/Logo';
import Aux from '../../../hoc/Auxilary'
import Navigation from '../NavigationalItems/NavigationalItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
const slideDrawer=(props)=>{
	let AddClasses=[classes.SlideDrawer,classes.Close];
	if(props.show){
		AddClasses=[classes.SlideDrawer,classes.Open];
	}
return (
	<Aux>
		<Backdrop purchased={props.show} clickBackdrop={props.clickBackdrop}/>
		<div className={AddClasses.join(' ')}>
		<div className={classes.Logo}><Logo/></div>
			<nav>
			<Navigation isauth={props.isauth} slideClick={props.slideClick}/>
			</nav>
		</div>
		</Aux>
	);
}


export default slideDrawer;