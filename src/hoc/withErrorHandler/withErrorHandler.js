import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal.js';
import Aux from '../Auxilary.js';
const withErrorHandler=(WrappedComponent,axios)=>{

	return class extends Component{
		state={
			error:null
		}

		componentWillMount=()=>{
			this.req=axios.interceptors.request.use(req=>{
				this.setState({error:null});
                return req;
			});
			this.res=axios.interceptors.response.use(res=>res,error=>{
				this.setState({error:error});
			});
		}
		setErrorCanceled=()=>{
			this.setState({error:null});
		}

		componentWillUnmount(){
			console.log('Will unmount',this.req,this.res);
			axios.interceptors.request.eject(this.req);
			axios.interceptors.request.eject(this.res);
		}

		render(){

			return (
				<Aux>
				<Modal purchased={this.state.error} clickBackdrop={this.setErrorCanceled}>
				{this.state.error?this.state.error.message:null}
				</Modal>
				<WrappedComponent {...this.props}/>
				</Aux>
				);
		}

	}
}
export default withErrorHandler;
