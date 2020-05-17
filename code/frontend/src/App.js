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
import FlowerDetails from './components/pages/customer/FlowerDetails'
import OrderCreaion from './components/pages/customer/OrderCreation'

// Importing Seller Pages
import SelectTimePlace from './components/pages/seller/selectTimePlace'
import SellerHome from './components/pages/seller/sellerHome'
import CreateArrangement from './components/pages/seller/CreateArrangement'
import Arrangements from './components/pages/seller/Arrangements'
import ArrangementDetails from './components/pages/seller/ArrangementDetails.js'
import SaleList from './components/pages/seller/SaleList'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/customer/accountid=:account_id/districtid=:district_id" component={Home} />
          <Route path="/selectDistrict/accountid=:account_id" component={SelectDistrict} />
          <Route path="/flowerdetails/accountid=:account_id/arrangementid=:arrangement_id" component={FlowerDetails} />
          <Route path="/order-creation/accountid=:account_id/arrangementid=:arrangement_id" component={OrderCreaion} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/order-tracking" component={OrderTracking} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/change-destination" component={ChangeDestination}/>
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/selectTimePlace" component={SelectTimePlace} />
          <Route path="/seller/:account_id" component={SellerHome} />
          <Route path="/createarrangements/accountid=:account_id" component={CreateArrangement} />
          <Route path="/arrangements/accountid=:account_id" component={Arrangements} />   
          <Route path="/arrangement-details/accountid=:account_id/arrangementid=:arrangement_id" component={ArrangementDetails} />   
          <Route path="/sale-list" component={SaleList} />   
          <Route component={NotFoundPage} />
        </Switch>
        </div>
    );
  }
}
export default App;