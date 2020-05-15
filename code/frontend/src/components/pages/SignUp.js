import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components'


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "customer"
        };
    }

    handleOptionChange = changeEvent => {
        
        this.setState({
            selectedOption: changeEvent.target.value
        });
        
    };

    render() {
        return (

            <Jumbotron>
                <h1>FlowerGarden</h1>
                <h2> Sign Up</h2>
                <div className="container" background-color="#ffffff73" >
                    <div className="row">
                        {/*Column 1 */}
                        <div className="col-md-6 col-sm-6">
                            *First Name:  <Input type="text" placeholder="" />
                             *Last Name:  <Input type="text" placeholder="" />
                            <FormGroup>
                                <Label> *Email</Label>
                                <Input type="email" placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                                <Label> *Password</Label>
                                <Input type="password" placeholder="Password" />
                            </FormGroup>
                            <FormGroup>
                                <Label> *Re-type password</Label>
                                <Input type="password" placeholder="Password" />
                            </FormGroup>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <input type="checkbox" aria-label="Checkbox for following text input" />
                                    </div>
                                </div>
                                I agree to the
                                <a className='ml-1 mr-1' href="\terms-of-use">Terms of Use</a>
                                and
                                <a className='ml-1 mr-1' href="\privacy-policy">Privacy Policy</a>
                                .

                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon1"> Sign Up </button>
                                </div>
                                <a className='ml-4 mt-2' href="\sign-up">Learn More</a>


                            </div>

                            *Required

                            </div>

                        {/*Column 2 */}
                        <div className="col-md-6 col-sm-6">
                            Middle Name  <Input type="text" placeholder="" />
                            *Phone  <Input type="text" placeholder="" />
                            
                            <div hidden ={(this.state.selectedOption !=="courier") && (this.state.selectedOption !=="seller")}>*IBAN</div>
                            <Input type="text" placeholder="" hidden =  { (this.state.selectedOption !=="courier") && (this.state.selectedOption !=="seller")}   />

                            <div hidden ={this.state.selectedOption !=="seller"}>*Address</div>
                            <Input type="text" placeholder="" hidden =  { this.state.selectedOption !=="seller"}   />

                            <br></br>
                            <div class="input-group mb-3" hidden =  { this.state.selectedOption !=="seller"} >
                                <select class="custom-select" id="province" >
                                    <option selected>Select a province</option>
                                    <option value="1">Ankara</option>
                                    <option value="2">İstanbul</option>
                                    <option value="3">Eskişehir</option>
                                </select>
                                <select class="custom-select" id="district">
                                    <option selected>Select a distric</option>
                                    <option value="1">Çankaya</option>
                                    <option value="2">Beytepe</option>
                                    <option value="3">100. Yıl</option>
                                </select>
                            </div>

                            <br></br>
                                Please select the desired account type:

                                <br></br>
                            <div className="container mt-3">
                                <form>
                                    <div className="form-check">
                                        <label>
                                            <input
                                                type="radio"
                                                value="customer"
                                                checked={this.state.selectedOption === "customer"}
                                                onChange={this.handleOptionChange}
                                                className="form-check-input" />Customer</label>
                                    </div>
                                    <div className="form-check">
                                        <label>
                                            <input
                                                type="radio"
                                                value="seller"
                                                checked={this.state.selectedOption === "seller"}
                                                onChange={this.handleOptionChange}
                                                className="form-check-input" />Seller</label>
                                    </div>
                                    <div className="form-check">
                                        <label>
                                            <input
                                                type="radio"
                                                value="courier"
                                                checked={this.state.selectedOption === "courier"}
                                                onChange={this.handleOptionChange}
                                                className="form-check-input" />Courier</label>
                                    </div>
                                    <div className="form-check">
                                        <label>
                                            <input
                                                type="radio"
                                                value="custService"
                                                checked={this.state.selectedOption === "custService"}
                                                onChange={this.handleOptionChange}
                                                className="form-check-input" />Customer Service</label>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
                <br></br>
            </Jumbotron>

        )
    }
}

/*hidden = {this.state.selectedOption==="customer"}*/

const SignUpContainer = styled.div`
.login-form{
    width: 100%;
    max-width: 700px;
    padding: 15px;
    margin: auto;
    height: 100%;
    margin-top:8%;
    margin-bottom:10%
  }
`;
export default SignUp;