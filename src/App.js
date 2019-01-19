import React, { Component } from 'react';
import asyncComponent from './hoc/asyncComponent/asyncComponent.js'
import Layout from './components/Layout/Layout';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import * as actions from './store/actions/index.js';
import {connect} from 'react-redux';

const asyncCheckout=asyncComponent(()=>{
  return import('./containers/checkout/checkout.js');
});

const asyncBurgerBuilder=asyncComponent(()=>{
  return import('./containers/BurgerBuilder/BurgerBuilder');
});

const asyncOrders=asyncComponent(()=>{
  return import('./containers/Orders/Order.js');
});

const asyncAuth=asyncComponent(()=>{
  return import('./containers/Auth/Auth.js');
});

const asyncLogOut=asyncComponent(()=>{
  return import('./containers/Auth/LogOut/LogOut.js');
});

class App extends Component {
	componentDidMount(){
   this.props.onauthCheckState();
 }
 render() {
   let  routes=( <Switch>
    <Route path="/" exact component={asyncBurgerBuilder}/>
    <Route path="/auth" component={asyncAuth}/>
    <Redirect to="/"/>
    </Switch>
    );
   if(this.props.isauth){
    routes=( <Switch>
      <Route path="/orders" component={asyncOrders}/>
      <Route path="/checkout" component={asyncCheckout}/>
      <Route path="/auth" component={asyncAuth}/>
      <Route path="/logOut" exact component={asyncLogOut}/>
      <Route path="/" exact component={asyncBurgerBuilder}/>
      <Redirect to="/"/>
      </Switch>);
  }
  return (
    <div>
    <Layout>
    {routes}
    </Layout>
    </div>
    );
}
}

const mapStatetoProps=state=>{
  return{
    isauth:state.auth.token!=null
  };
}

const mapDispatchtoProps=dispatch=>{
  return{
    onauthCheckState:()=>dispatch(actions.authCheckState())
  };
}
export default withRouter(connect(mapStatetoProps,mapDispatchtoProps)(App));
