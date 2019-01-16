import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Input from '../../components/UI/Input/Input.js';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index.js';
import Spinner from '../../components/UI/spinner/spinner.js';

class Auth extends Component {
	state={
		controls:{
			email:{ 
				elementType:'input',
				elementConfig:{
					type:'email',
					placeholder:'Your Email'
				},
				value:'',
				rules:{
					required:true
				},
				touch:false,
				valid:false
			},
			password:{ 
				elementType:'input',
				elementConfig:{
					type:'password',
					placeholder:'Your password'
				},
				value:'',
				rules:{
					required:true,
					minLength:6
				},
				touch:false,
				valid:false
			}
		},
		isSignUp:true	
	}
	checkValid=(value,rules)=>{
		let isValid=true;
		if(rules.required){
			isValid=value.trim()!==''&&isValid;
		}
		if(rules.minLength){
			isValid=value.length>=rules.minLength&&isValid;
		}
		return isValid;
	}

	orderhandler=(event)=>{
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
	}

	inputChangeHandler=(event,identifier)=>{	
		let newcontrols={...this.state.controls};
		let newControlsInput={...newcontrols[identifier]};
		newControlsInput['value']=event.target.value;
		newControlsInput['touch']=true;
		newControlsInput['valid']=this.checkValid(event.target.value,newcontrols[identifier].rules);
		newcontrols[identifier]=newControlsInput;
		this.setState({controls:newcontrols});
	}
	switchAuthMode=()=>{
		this.setState(prev=>{
			return({isSignUp:!prev.isSignUp});
		});
	}

	render(){
		const formElementArray=[];
		for(let key in this.state.controls){
			formElementArray.push({
				id:key,
				config:this.state.controls[key]
			});
		}

		let contactData=(<form onSubmit={this.orderhandler}>
			{formElementArray.map(formElement=>(
				<Input 
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				touch={formElement.config.touch}
				shouldValidate={formElement.config.rules}
				changed={(event)=>{this.inputChangeHandler(event,formElement.id)}}/>
				))}
			<Button  type='Success'>Switch to {this.state.isSignUp?'Sign Up':'Sign In'}</Button>
			</form>	
			);
		let errorMessage=null;
		if(this.props.error){
			errorMessage=<p>{this.props.error.message}</p>
		}
		if(this.props.loading){
			contactData=<Spinner/>
		}
		return(<div className={classes.AuthData}>
			{errorMessage}
			{contactData}
			<Button type='Danger' click={this.switchAuthMode}>Switch to {this.state.isSignUp?'Sign In':'Sign Up'}</Button>
			</div>);
	}
}

const mapStatetoProps=state=>{
	return{
		loading:state.auth.loading,
		error:state.auth.error
	};
}

const mapDispatchtoProps=dispatch=>{
	return{
		onAuth:(email,pass,isSignUp)=>dispatch(actions.auth(email,pass,isSignUp))
	};
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Auth);