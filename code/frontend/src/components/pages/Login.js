import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';
import styled from 'styled-components'
import Footer from '../layouts/Footer';
import axios from 'axios'
import { Redirect } from 'react-router-dom';


class Login extends Component {
    

    state = {
        email: "",
        password: "",
        account_id: null,
        account_type: 0,
        redirectToReferrer: false
    };

    handleSubmit = event => {
        event.preventDefault();
        var data = { email: this.state.email, password: this.state.password }
        console.log(data)
        var address = window.$globalAddress + "/login"
        axios.post( address, data).then(res => {
            console.log(res);
            // console.log(res.data.data.account_id)
            // Here we are checking whether we were able to log in or not ! 
            // We can show some warning like no user etct  
            if (res.data.status === 1) {
                // After this we are able to change the state data with the taken information from server
                var id = res.data.data.account_id
                this.setState({ account_id: id })
                this.setState({ account_type: res.data.data.account_type })
                this.setState({ redirectToReferrer: true })
            }
            else {
                window.confirm("There is no such user")
                console.log("There is no such user")
            }

        });

    }

    changeEmail = event => { event.preventDefault(); this.setState({ email: event.target.value }); console.log(this.state.email); }

    changePassword = event => { event.preventDefault(); this.setState({ password: event.target.value }); console.log(this.state.password) }

    render() {

        const redirectToReferrer = this.state.redirectToReferrer;
        //customer
        if (redirectToReferrer === true && this.state.account_type === 0) {
            return <Redirect push to={`/selectDistrict/accountid=${this.state.account_id}`} />
        }
        //courier
        if (redirectToReferrer === true && this.state.account_type === 1) {
            return <Redirect push to={`/deliverytracking/accountid=${this.state.account_id}`} />
        }
        //seller
        if (redirectToReferrer === true && this.state.account_type === 2) {
            return <Redirect push to={`/sale-list/seller/accountid=${this.state.account_id}`} />
        }
        //customer service
        if (redirectToReferrer === true && this.state.account_type === 7) {
            return <Redirect push to={`/complaint-list/service/accountid=${this.state.account_id}`} />
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
                                <Input type="email" placeholder="Email"  onChange={this.changeEmail} />
                            </FormGroup>
                            <FormGroup>
                                <Label> Password</Label>
                                <Input type="password" placeholder="Password"  onChange={this.changePassword} />
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