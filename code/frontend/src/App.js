import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
// React Router Import 
import { Switch, Route } from 'react-router-dom'
// Importing Pages
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Notifications from './components/pages/Notifications';
import NotFoundPage from './components/pages/NotFoundPage';
import SignUp from './components/pages/SignUp';
import Profile from './components/pages/Profile';
import ChangeDestination from './components/pages/ChangeDestination';
import OrderTracking from './components/pages/OrderTracking'
import ForgotPassword from './components/pages/ForgotPassword'



class App extends Component {

  render() {
    return (

      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/order-tracking" component={OrderTracking} />
          <Route path="/profile" component={Profile} />
          <Route path="/change-destination" component={ChangeDestination}/>
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );

  }
}

export default App;
