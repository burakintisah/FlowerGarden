import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';
import styled from 'styled-components'
import Footer from '../layouts/Footer';

export default class Login extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>FlowerGarden</h1>
                    <h2> Welcome </h2>
                    <LoginContainer>
                        <Form className="login-form bk">
                            <FormGroup>
                                <Label> Email</Label>
                                <Input type="email" placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                                <Label> Password</Label>
                                <Input type="password" placeholder="Password" />
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