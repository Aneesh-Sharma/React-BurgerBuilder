import React, { Component } from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/Auxilary'
import Backdrop from '../Backdrop/Backdrop'
class Modal extends Component{
	shouldComponentUpdate(nextProps,nextState){
		return this.props.purchased!==nextProps.purchased||this.props.children!==nextProps.children;
	}
	componentWillUpdate(){
		console.log("Modal Update");
	}
	render(){
		return(
		<Aux>
		<Backdrop purchased={this.props.purchased} clickBackdrop={this.props.clickBackdrop}/>
		<div 
		className={classes.Modal} 
		style={{    transform:this.props.purchased?'translateY(0)':'translateY(-100vh)',
					opacity:this.props.purchased?'1':'0'}} >
		{this.props.children}
		</div>
		</Aux>
		);
	}
}
export default Modal;