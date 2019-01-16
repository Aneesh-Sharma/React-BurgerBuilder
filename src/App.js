import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/checkout/checkout.js';
import {Route,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Order.js';
import Auth from './containers/Auth/Auth.js';
import LogOut from './containers/Auth/LogOut/LogOut.js';
class App extends Component {
	
  render() {
    return (
            <div>
              <Layout>
              <Switch>
               <Route path="/orders" component={Orders}/>
              <Route path="/checkout" component={Checkout}/>
              <Route path="/auth" component={Auth}/>
              <Route path="/" exact component={BurgerBuilder}/>
              <Route path="/logOut" exact component={LogOut}/>
               </Switch>
              </Layout>
            </div>
    );
  }
}

export default App;
