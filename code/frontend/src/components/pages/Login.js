import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components'

class Login extends Component {
    render() {
        return (
            <LoginContainer>
                <Form className="login-form bk">
                    <h1 className="text-center">
                        <span className="font-weight-bold">FlowerGarden </span>
                    </h1>
                    <h2 className="text-center">
                        Welcome
                </h2>
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

        )
    }
}

export default Login;


const LoginContainer = styled.div`
.login-form{
    width: 100%;
    max-width: 600px;
    padding: 15px;
    margin: auto;
    height: 100%;
    margin-top:8%;
    margin-bottom:10%
  }
`;