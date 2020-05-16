import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// React Router Import 
import { Switch, Route } from 'react-router-dom'
// Importing Pages
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import NotFoundPage from './components/pages/NotFoundPage';
import ForgotPassword from './components/pages/ForgotPassword'

// Importing Customer Pages
import Home from './components/pages/customer/Home';
import Notifications from './components/pages/customer/Notifications';
import Profile from './components/pages/customer/Profile';
import OrderTracking from './components/pages/customer/OrderTracking'
import ChangeDestination from './components/pages/customer/ChangeDestination'
import SelectDistrict from './components/pages/customer/selectDistrict'

// Importing Seller Pages
import SelectTimePlace from './components/pages/seller/selectTimePlace'
import SellerHome from './components/pages/seller/sellerHome'

class App extends Component {

  render() {
    return (

      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/customer/:account_id" component={Home} />
          <Route path="/selectDistrict" component={SelectDistrict} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/order-tracking" component={OrderTracking} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/change-destination" component={ChangeDestination}/>
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/selectTimePlace" component={SelectTimePlace} />
          <Route path="/seller/:account_id" component={SellerHome} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );

  }
}

export default App;
