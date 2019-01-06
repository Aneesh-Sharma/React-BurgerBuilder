import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './contactData.css';
import Spinner from '../../../components/UI/spinner/spinner.js';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input.js';
import {connect} from 'react-redux';

class ContactData extends Component{
	state={
		orderForm:{
			name:{ 
				elementType:'input',
				elementConfig:{
					type:'text',
					placeholder:'Your Name'
				},
				value:'',
				rules:{
					required:true
				},
				touch:false,
				valid:false
			},
			street:{ 
				elementType:'input',
				elementConfig:{
					type:'text',
					placeholder:'Your street'
				},
				value:'',
				touch:false,
				rules:{
					required:true
				},
				valid:false
			},
			zipcode:{ 
				elementType:'input',
				elementConfig:{
					type:'text',
					placeholder:'Your Zip'
				},
				value:'',
				rules:{
					required:true,
					minLength:3,
					maxLength:6
				},
				touch:false,
				valid:false
			},
			country:{ 
				elementType:'input',
				elementConfig:{
					type:'text',
					placeholder:'Your country'
				},
				value:'',
				rules:{
					required:true
				},
				touch:false,
				valid:false
			},
			email:{ 
				elementType:'input',
				elementConfig:{
					type:'text',
					placeholder:'Your Email'
				},
				value:'',
				rules:{
					required:true
				},
				touch:false,
				valid:false
			},
			deliveryTime:{ 
				elementType:'select',
				elementConfig:{
					options:[
					{value:'fastest',displayValue:'fastest'},
					{value:'cheapest',displayValue:'cheapest'}
					]
				},
				touch:false,
				value:'fastest',
				rules:{},
				valid:true
			}
		},
		formValid:false,
		loading:false
	}
	orderhandler=(event)=>{
		event.preventDefault();
		this.setState({loading:true});
		let customerInfo={};
		for(let indenifier in this.state.orderForm){
			customerInfo[indenifier]=this.state.orderForm[indenifier].value;
		}
		const order={
			ingredients:this.props.ing,
			price:this.props.price,
			customer:customerInfo
		}
		axios.post('/orders.json',order)
		.then(response=>{
			this.setState({loading:false});
			console.log(response);
			this.props.history.push('/');
		})
		.catch(error=>{
			console.log(error);
			this.setState({loading:false});
		});
	}

	checkValid=(value,rules)=>{
		let isValid=true;
		if(rules.required){
			isValid=value.trim()!==''&&isValid;
		}
		if(rules.minLength){
			isValid=value.length>=rules.minLength&&isValid;
		}
 		if(rules.maxLength){
			isValid=value.length<=rules.maxLength&&isValid;
		}
		return isValid;
	}

	inputChangeHandler=(event,identifier)=>{
		
		let newOrderForm={...this.state.orderForm};
		let newOrderFormInput={...newOrderForm[identifier]};
		newOrderFormInput['value']=event.target.value;
		newOrderFormInput['touch']=true;
		newOrderFormInput['valid']=this.checkValid(event.target.value,newOrderForm[identifier].rules);
		newOrderForm[identifier]=newOrderFormInput;
		let formValid=true;
		for(let identifier in newOrderForm){
       		formValid=newOrderForm[identifier].valid&&formValid;
		}
		console.log(newOrderFormInput);
		this.setState({orderForm:newOrderForm,formValid:formValid});
	}

	render(){
		const formElementArray=[];
		for(let key in this.state.orderForm){
			formElementArray.push({
				id:key,
				config:this.state.orderForm[key]
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
			<Button  type='Success' disabled={!this.state.formValid}>Order</Button>
			</form>	
			);
		if(this.state.loading){
			contactData=<Spinner/>;
		}
		return(<div className={classes.ContactData}>
			<h4>Enter Contact details</h4>
			{contactData}
			</div>);
	}

}

const mapStatetoProps=state=>{
	return{
		ing:state.ingredients,
		price:state.price
	};
}
export default connect(mapStatetoProps)(ContactData);