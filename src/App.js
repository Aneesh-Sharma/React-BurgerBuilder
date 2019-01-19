import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/checkout/checkout.js';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Order.js';
import Auth from './containers/Auth/Auth.js';
import LogOut from './containers/Auth/LogOut/LogOut.js';
import * as actions from './store/actions/index.js';
import {connect} from 'react-redux';
class App extends Component {
	componentDidMount(){
   this.props.onauthCheckState();
 }
 render() {
 let  routes=( <Switch>
    <Route path="/" exact component={BurgerBuilder}/>
    <Route path="/auth" component={Auth}/>
    <Redirect to="/"/>
    </Switch>
    );
  if(this.props.isauth){
    routes=( <Switch>
      <Route path="/orders" component={Orders}/>
      <Route path="/checkout" component={Checkout}/>
       <Route path="/auth" component={Auth}/>
      <Route path="/logOut" exact component={LogOut}/>
      <Route path="/" exact component={BurgerBuilder}/>
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
