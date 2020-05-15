import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';
import styled from 'styled-components'
import Footer from '../layouts/Footer';
import axios from 'axios'

export default class Login extends Component {


    state = {
        email: "emre@gmail.com",
        password:"12345" 
    };

    handleSubmit = event => {
        event.preventDefault();
        var data = { email: this.state.email, password: this.state.password }
        axios.post('http://localhost:5000/login', data).then(res => { 
            console.log(res); 
            console.log(res.data.data.email)
            })
    }

    changeEmail = event => { event.preventDefault(); this.setState({ email: event.target.value }); console.log(this.state.email); }

    changePassword = event => { event.preventDefault(); this.setState({ password: event.target.value }); console.log(this.state.password) }

    render() {
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