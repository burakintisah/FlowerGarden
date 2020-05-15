import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';
import Footer from '../layouts/Footer'

class ForgotPassword extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>FlowerGarden</h1>
                    <h5> Forgot Password </h5>
                    <div className="container">
                        <Form >

                            <FormGroup>
                                <Label> Email</Label>
                                <Input type="Email" placeholder="Email" />
                            </FormGroup>
                            <Button className="btn-lg btn-dark btn-block">Get New Password</Button>


                        </Form>

                    </div>

                </Jumbotron>
                <Footer />
            </div>

        )
    }
}

export default ForgotPassword;
