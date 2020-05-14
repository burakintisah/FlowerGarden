import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'

import { Button, Form, FormGroup, Label, Input} from 'reactstrap';


class App extends Component{

  render (){
    return (
      
    <div>
      <Navbar/>
      <br/>
       Excepteur anim consectetur deserunt excepteur eu culpa. Sunt sunt velit Lorem enim pariatur. Veniam esse nulla Lorem ut occaecat officia reprehenderit minim culpa irure et aliquip eu. Culpa commodo ex laboris laborum veniam sint. Amet dolor eu sint aliquip adipisicing aliquip exercitation fugiat magna cillum labore nisi ea nulla. 
      <Footer/>
    </div>
    );

  }
}

export default App;








/*import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    email: '',
    password: ''
  }
  
  // componentDidMount() {
  //   this.getAccounts();

  // }

  // getAccounts = _ => {
  //   axios.get('/login')
  //     .then((res) => {
  //       console.log(res.data.accounts);
  //       this.setState({ accounts: res.data.accounts });
  //     })
  //     .catch(error => console.log(error));
  // }

  //showAccounts = account => <div key={account.idAccount}> {account.name}</div>
  handleSubmit = event => {
    event.preventDefault();

    var account = {
      email: event.target.email.value,
      password: event.target.password.value
    };

    axios.post('/login', { account })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }


  render() {
    // const { accounts } = this.state;
    // return (
    //   <div className="App">
    //     {accounts.map(this.showAccounts)}

    //   </div>
    // );
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" />
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
*/