import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index.js';
import {Redirect} from 'react-router-dom';
class LogOut extends Component {
	componentDidMount(){
 		this.props.onLogOut();
	}
render(){
	return <Redirect to="/"/>;
}
}

const mapDispatchtoProps=dispatch=>{
	return{
		onLogOut:()=>dispatch(actions.logOut())
	};
}

export default connect(null,mapDispatchtoProps)(LogOut);