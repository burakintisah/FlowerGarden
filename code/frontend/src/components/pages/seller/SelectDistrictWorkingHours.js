import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import axios from 'axios'
import { Redirect } from 'react-router-dom';



class SelectDistrictWorkingHours extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account_id: null,
            province_id: null,
            provinces: null,
            district_id: null,
            districts: null,
            redirectToArrangements: false
        };
    }



    componentDidMount() {
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
        axios.post('http://localhost:5000/district', data).then(res => {
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

        const redirectToReferrer = this.state.redirectToArrangements;
        if (redirectToReferrer === true ) {
            return <Redirect to={`/selectDistrict/accountid=${this.state.account_id}`} />
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
                <h1>FlowerGarden</h1>
                <h3> Choose the district you will serve: </h3>
                <div className="container"  >
                            <div  >
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
                </div>
            </div>

        )
    }
}

export default SelectDistrictWorkingHours;