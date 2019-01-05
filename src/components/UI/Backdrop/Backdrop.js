import React from 'react';
import classes from './Backdrop.css'
const backdrop=(props)=>{
	return(props.purchased?<div className={classes.Backdrop} onClick={props.clickBackdrop}/>:null
		);
	}
export default backdrop;