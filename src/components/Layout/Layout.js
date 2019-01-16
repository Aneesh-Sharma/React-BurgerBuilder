import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.css';
import Toolbar from '../Navigational/Toolbar/Toolbar';
import {connect} from 'react-redux';
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
    slideClick=()=>{
		this.setState({
			show:false
		});
	}
	render(){
		return(
			<Aux>
			<Toolbar toggleClicked={this.toggleClicked} isauth={this.props.isauth} />
			<SlideDrawer show={this.state.show} 
			clickBackdrop={this.clickBackdrop}
			slideClick={this.slideClick} 
			isauth={this.props.isauth}/>
			<main className={classes.Context}>
			{this.props.children}
			</main>	
			</Aux>
		);
	}
} 

const mapStatetoProps=state=>{
	return{
		isauth:state.auth.token!=null
	};
}
export default connect(mapStatetoProps)(Layout);