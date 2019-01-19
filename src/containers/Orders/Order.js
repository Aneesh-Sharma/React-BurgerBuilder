import React, { Component } from 'react';
import Order from '../../components/order/order.js';
import axios from '../../axios-orders.js'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';
import Spinner from '../../components/UI/spinner/spinner.js';
import * as actions from '../../store/actions/index.js';
import {connect} from 'react-redux';
class Orders extends Component{

	componentDidMount(){
		this.props.fetchOrders(this.props.token,this.props.userId);
	}

	render(){
		let orders=<Spinner/>;
		if(!this.props.loading){
			orders=this.props.orders.map((order)=>(
				<Order
				key={order.id}
				ingredients={order.ingredients}
				price={order.price}/>
				));

		}
		return(<div>
			{orders}
			</div>);
	}
}

const mapStatetoProps=state=>{
	return{
		loading:state.order.loading,
		orders:state.order.orders,
		token:state.auth.token,
		userId:state.auth.userId
	};
}

const mapDispatchtoProps=dispatch=>{
	return{
		fetchOrders:(token,userId)=>dispatch(actions.fetchOrder(token,userId))
	};
}

export default connect(mapStatetoProps,mapDispatchtoProps)(WithErrorHandler(Orders,axios));