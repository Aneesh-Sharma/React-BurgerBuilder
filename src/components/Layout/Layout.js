import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.css';
import Toolbar from '../Navigational/Toolbar/Toolbar';
import SlideDrawer from '../Navigational/SlideDrawer/SlideDrawer';
class Layout extends Component{
	state={
		show:false
	};
	clickBackdrop=()=>{
		this.setState({
			show:false
		});
	}
    toggleClicked=()=>{
    	this.setState((prevState)=>{
			return {show:!prevState.show}
		});
    }
	render(){
		return(
			<Aux>
			<Toolbar toggleClicked={this.toggleClicked}/>
			<SlideDrawer show={this.state.show} clickBackdrop={this.clickBackdrop}/>
			<main className={classes.Context}>
			{this.props.children}
			</main>	
			</Aux>
		);
	}
} 
export default Layout;