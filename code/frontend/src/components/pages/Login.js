import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';
import styled from 'styled-components'
import Footer from '../layouts/Footer';
import axios from 'axios'
import { Link , Redirect} from 'react-router-dom';

class Login extends Component {


    state = {
        email: "emre@gmail.com",
        password:"12345" ,
        account_id: 1,
        account_type: 0,
        redirectToReferrer: false
    };

    handleSubmit = event => {
        event.preventDefault();
        var data = { email: this.state.email, password: this.state.password }
        axios.post('http://localhost:5000/login', data).then(res => { 
            console.log(res); 
            // console.log(res.data.data.email)
            // Here we are checking whether we were able to log in or not ! 
            // We can show some warning like no user etct  
            if (res.data.status === 1){
                this.setState({ redirectToReferrer: true})
                // After this we are able to change the state data with the taken information from server
                //this.setState({ account_id: res.data.data.account_id })
                //this.setState({ account_type: res.data.data.account_type })
            }
            else {
                console.log("There is no such user")
            }
            
            });

    }

    changeEmail = event => { event.preventDefault(); this.setState({ email: event.target.value }); console.log(this.state.email); }

    changePassword = event => { event.preventDefault(); this.setState({ password: event.target.value }); console.log(this.state.password) }

    render() {
        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true &&  this.state.account_type=== 0) {
            return <Redirect to={`/customer/${this.state.account_id}`}/>
        }
        if (redirectToReferrer === true &&  this.state.account_type=== 1) {
            return <Redirect to={`/seller/${this.state.account_id}`}/>
        }
        if (redirectToReferrer === true &&  this.state.account_type=== 2) {
            return <Redirect to={`/courier/${this.state.account_id}`}/>
        }
        if (redirectToReferrer === true &&  this.state.account_type=== 3) {
            return <Redirect to={`/service/${this.state.account_id}`}/>
        }

        return (
            <div>
                <Jumbotron>
                    <h1>FlowerGarden</h1>
                    <h2> Welcome </h2>
                    <LoginContainer >
                        <Form className="login-form bk" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label> Email</Label>
                                <Input type="email" placeholder="Email" value = "emre@gmail.com" onChange={this.changeEmail} />
                            </FormGroup>
                            <FormGroup>
                                <Label> Password</Label>
                                <Input type="password" placeholder="Password" value = "12345" onChange={this.changePassword} />
                            </FormGroup>
                            <Button className="btn-lg btn-dark btn-block">Log in</Button>
                            <div className='text-center mt-3 mb-3'>
                                <a href="\sign-up">Sign up</a>
                                <span className="p-2">|</span>
                                <a href="\forgot-password">Forgot Password</a>
                            </div>
                        </Form>
                        
                    </LoginContainer>
                </Jumbotron>

                <Footer />
            </div>


        )
    }
}


export default Login;

const LoginContainer = styled.div`
.login-form{
    width: 100%;
    max-width: 600px;
    margin-left: 25px;
    margin: auto;
    height: 100%;
    margin-top:8%;
    margin-bottom:10%
  }
`;