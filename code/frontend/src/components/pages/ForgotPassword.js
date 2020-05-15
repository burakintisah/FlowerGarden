import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';
import styled from 'styled-components'
import Footer from '../layouts/Footer'

class ForgotPassword extends Component {

    
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
                            <Button className="btn-lg btn-dark btn-block">Get New Password</Button>
                        </Form>
                    </LoginContainer>
                </Jumbotron>
                <Footer />
            </div>


        )
    }
}

export default ForgotPassword;



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