import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Footer from '../layouts/Footer'
import Select from 'react-select';
import axios from 'axios'
import { Redirect } from 'react-router-dom';



class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "customer",
            account_type: 0,
            account_id: null,
            firstName: null,
            middleName: null,
            lastName: null,
            phone:null,
            email: null,
            password: null,
            repassword: null,
            termsOfUse: false,
            iban: null,
            sellerAddress: null,
            courierVolume: null,
            province: null,
            sellerDistrict: null,
            province_id: null,
            provinces: null,
            district_id: null,
            districts: null,
            redirectToReferrer: false
        };
    }

   

    signUpPost = event => {
        event.preventDefault();
        if( (this.state.firstName===null) || (this.state.lastName===null)|| (this.state.email===null)||(this.state.password===null)||(this.state.repassword===null)||(this.state.password!== this.state.repassword)||!(this.state.termsOfUse)||(this.state.phone===null))
        {
            alert("You must fill the all required information!"); //diğer bölümleri için de yapabilirsin daha sonra
        }
        var data = null;
        if(this.state.account_type ===0 ||this.state.account_type ===3)
        {
            data = { first_name: this.state.firstName, middle_name: this.state.middleName,last_name: this.state.lastName, email: this.state.email, password: this.state.password, phone: this.state.phone, account_type: this.state.account_type, }
        }
        else if(this.state.account_type ===1 )
        {
            data = { first_name: this.state.firstName, middle_name: this.state.middleName,last_name: this.state.lastName, email: this.state.email, password: this.state.password, phone: this.state.phone, account_type: this.state.account_type, district_id: this.state.district_id, address_text:this.state.sellerAddress , iban_no: this.state.iban }
        }
        else if(this.state.account_type ===2 )
        {
            data = { first_name: this.state.firstName, middle_name: this.state.middleName,last_name: this.state.lastName, email: this.state.email, password: this.state.password, phone: this.state.phone, account_type: this.state.account_type, max_volume: this.state.courierVolume, iban_no: this.state.iban }
        }
        else{
            console.log("There is a porblem with account type")
        }
        console.log("Sent data:")
        console.log(data)
        axios.post(window.$globalAddress + '/signup', data).then(res => {
            console.log("RES data:")    
            console.log(res);
            if (res.data.status === 1) {
                var id = res.data.data.account_id
                this.setState({ account_id: id })
                this.setState({ redirectToReferrer: true })
            }
            else {
                alert("There is no such user");
            }

        });
    };

    changeFirstName = event => { event.preventDefault(); this.setState({ firstName: event.target.value }); console.log(this.state.firstName); }
    changeMiddleName = event => { event.preventDefault(); this.setState({ middleName: event.target.value }); console.log(this.state.middleName); }
    changeLastName = event => { event.preventDefault(); this.setState({ lastName: event.target.value }); console.log(this.state.lastName); }
    changePhone = event => { event.preventDefault(); this.setState({ phone: event.target.value }); console.log(this.state.phone); }
    changeEmail = event => { event.preventDefault(); this.setState({ email: event.target.value }); console.log(this.state.email); }
    changePassword = event => { event.preventDefault(); this.setState({ password: event.target.value }); console.log(this.state.password) }
    changeRePassword = event => { event.preventDefault(); this.setState({ repassword: event.target.value }); console.log(this.state.repassword) }
    changeTermsOfUse = event => { event.preventDefault(); this.setState({ termsOfUse: !(this.state.termsOfUse) }); console.log(this.state.termsOfUse); }
    changeIBAN = event => { event.preventDefault(); this.setState({ iban: event.target.value }); console.log(this.state.iban); }
    changeAddress = event => { event.preventDefault(); this.setState({ sellerAddress: event.target.value }); console.log(this.state.sellerAddress); }
    changeVolume = event => { event.preventDefault(); this.setState({ courierVolume: event.target.value }); console.log(this.state.courierVolume); }


    handleOptionChange = changeEvent => {
        this.setState({selectedOption: changeEvent.target.value});
        if (changeEvent.target.value === "customer") {this.setState({account_type: 0}); console.log(this.state.account_type);}
        else if (changeEvent.target.value === "seller") {this.setState({account_type: 1}); console.log(this.state.account_type);}
        else if (changeEvent.target.value === "courier") {this.setState({account_type: 2}); console.log(this.state.account_type);}
        else {this.setState({account_type: 3});}
    };


    componentDidMount() {
        axios.get(window.$globalAddress + '/province').then(res => {
            //console.log(res.data.data)
            if (res.data.status === 1) {
                this.setState({ provinces: res.data.data })
            }
        });
    }
    provinceSelect = prov => {
        // getting the districts according to province!!
        console.log(`Option selected:`, prov.value);
        var data = { province_id: prov.value};
        console.log("DATA");
        console.log(data);
        axios.post(window.$globalAddress + '/district', data).then(res => {
            console.log("Retrieved Data")
            console.log(res)
            if (res.data.status === 1) {
                this.setState({ districts: res.data.data })
            }
            else {
                console.log("No district data!")
            }
        });
    };

    districtSelect = dist => {
        // getting the districts according to province!!
        console.log(`Option selected:`, dist.value);
        this.setState({ district_id: dist.value})
    };

    render() {

        const redirectToReferrer = this.state.redirectToReferrer;
        //customer
        if (redirectToReferrer === true && this.state.account_type === 0) {
            return <Redirect to={`/selectDistrict/accountid=${this.state.account_id}`} />
        }
        //seller
        if (redirectToReferrer === true && this.state.account_type === 1) {
            return <Redirect to={`/seller/${this.state.account_id}`} />
        }
        if (redirectToReferrer === true && this.state.account_type === 2) {
            return <Redirect to={`/courier/${this.state.account_id}`} />
        }
        if (redirectToReferrer === true && this.state.account_type === 3) {
            return <Redirect to={`/service/${this.state.account_id}`} />
        }

        var display_provinces = []
        if (this.state.provinces != null) {
            display_provinces = this.state.provinces.map(item => {
                const container = {};

                container["value"] = item.province_id;
                container["label"] = item.province_name;

                return container;
            })

        }
        var display_district = []
        if (this.state.districts != null) {
            display_district = this.state.districts.map(item => {
                const container = {};

                container["value"] = item.district_id;
                container["label"] = item.district_name;

                return container;
            })

        }

        return (
            <div>
            <Jumbotron>
                <h1>FlowerGarden</h1>
                <h2> Sign Up</h2>
                <div className="container" background-color="#ffffff73" >
                    <div className="row">
                        {/*Column 1 */}
                        <div className="col-md-6 col-sm-6">
                            *First Name:  <Input type="text" placeholder="" onChange={this.changeFirstName} />
                             *Last Name:  <Input type="text" placeholder="" onChange={this.changeLastName}/>
                            <FormGroup>
                                <Label> *Email</Label>
                                <Input type="email" placeholder="Email" onChange={this.changeEmail} />
                            </FormGroup>
                            <FormGroup>
                                <Label> *Password</Label>
                                <Input type="password" placeholder="Password" onChange={this.changePassword}/>
                            </FormGroup>
                            <FormGroup>
                                <Label> *Re-type password</Label>
                                <Input type="password" placeholder="Password" onChange={this.changeRePassword} />
                            </FormGroup>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <input type="checkbox" aria-label="Checkbox for following text input" onChange={this.changeTermsOfUse}/>
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
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon1" onClick={this.signUpPost}> Sign Up </button>
                                </div>
                                <a className='ml-4 mt-2' href="\sign-up">Learn More</a>


                            </div>

                            *Required

                            </div>

                        {/*Column 2 */}
                        <div className="col-md-6 col-sm-6">
                            Middle Name  <Input type="text" placeholder="" onChange={this.changeMiddleName} />
                            *Phone  <Input type="text" placeholder="" onChange={this.changePhone} />
                            
                            <div hidden ={(this.state.selectedOption !=="courier") && (this.state.selectedOption !=="seller")} >*IBAN</div>
                            <Input type="text" placeholder="" hidden =  { (this.state.selectedOption !=="courier") && (this.state.selectedOption !=="seller")} onChange={this.changeIBAN}  />

                            <div hidden ={this.state.selectedOption !=="courier"} >*Maximum volume you can carry</div>
                            <Input type="text" placeholder="" hidden =  {this.state.selectedOption !=="courier"} onChange={this.changeVolume}  />

                            <div hidden ={this.state.selectedOption !=="seller"}>*Address</div>
                            <Input type="text" placeholder="" hidden =  { this.state.selectedOption !=="seller"} onChange={this.changeAddress}  />

                            
                            <div   hidden =  { this.state.selectedOption !=="seller"} >
                                <FormGroup>
                                    <Label> Province</Label>
                                    <Select onChange={this.provinceSelect}
                                    
                                        options={display_provinces}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label> District </Label>
                                    <Select onChange={this.districtSelect}
                                        options={display_district}
                                    />
                                </FormGroup>
                            </div>
                                Please select the desired account type:                               
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
            <Footer />
            </div>

        )
    }
}

export default SignUp;