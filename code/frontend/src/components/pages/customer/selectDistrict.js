import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import styled from 'styled-components'
import Navbar from '../../layouts/NavbarCustomer'
import Footer from '../../layouts/Footer'
import axios from 'axios'


class selectDistrict extends Component {

    state = {
        province_id: 1,
        provinces: null,
        district_id: 1,
        districts: null,
        account_id: null,
        redirectToReferrer: false

    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ account_id: params.account_id })
        axios.get('http://localhost:5000/province').then(res => {
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
        axios.get('http://localhost:5000/district', data).then(res => {
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

    handleSubmit = event => {
        event.preventDefault();
        //directing to the home page...
        this.setState({ redirectToReferrer: true })
    }

    render() {

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

                container["value"] = item.province_id;
                container["label"] = item.province_name;

                return container;
            })

        }

        const redirectToReferrer = this.state.redirectToReferrer;
        //customer
        if (redirectToReferrer === true) {
            return <Redirect to={`/customer/accountid=${this.state.account_id}/provinceid=${this.state.province_id}/districtid=${this.state.district_id}`} />
        };


        return (

            <div>
                <Navbar />

                <DistrictContainer >
                    <div className='header'>
                        <p className='ml-2'><h1> FlowerGarden</h1> </p>

                        <h7> With FlowerGarden, your flower is just a few clicks away! </h7>
                        <h9> Choose the destination district and order.</h9>
                    </div>
                    <Form className="login-form bk" onSubmit={this.handleSubmit}>
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
                        <div className="container mt-3">
                            <div className="row">
                                <div className="col-md-6 col-sm-6">
                                </div>
                                <div className="col-md-6 ">
                                    <Button className="btn-lg btn-dark btn-block mt-3 ml-3">Continue</Button>
                                </div>
                            </div>
                        </div>

                    </Form>

                </DistrictContainer>

                <Footer />
            </div>
        )
    }
}

export default selectDistrict;

const DistrictContainer = styled.div`
.login-form{
                        width: 100%;
    max-width: 600px;
    margin-left: 25px;
    margin: auto;
    height: 100%;
    margin-top:3%;
    margin-bottom:10%
  }
.header {

                        max - width: 700px;
    margin: auto;
    margin-top:8%;
    margin-bottom: 10px;
    text-align: center;

}
`;