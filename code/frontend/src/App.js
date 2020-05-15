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


class App extends Component {

  render() {
    return (

      <div>
        <SignUp/>
      </div>
    );

  }
}

export default App;


/*        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/order-tracking" component={OrderTracking} />
          <Route path="/my-account" component={Profile} />
          <Route path="/change-destination" component={ChangeDestination}/>

          <Route component={NotFoundPage} />
        </Switch>
        <Footer />*/