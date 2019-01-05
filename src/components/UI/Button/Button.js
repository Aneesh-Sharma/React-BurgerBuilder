import React from 'react';
import classes from './Button.css'
const button=(props)=>{
	return(<button 
		className={[classes.Button,classes[props.type]].join(' ')}
		disabled={props.disabled}
		onClick={props.click}>
		{props.children}
		</button>);
}
export default button;