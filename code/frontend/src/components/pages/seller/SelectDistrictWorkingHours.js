import React, { Component } from 'react'
import { Container, Row, Col,Button, FormGroup } from 'reactstrap';
import Select from 'react-select';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { Multiselect } from 'multiselect-react-dropdown';
import Navbar from '../../layouts/NavbarSeller'

var working_hours_mon = [];
var working_hours_tue = [];
var working_hours_wed = [];
var working_hours_thr = [];
var working_hours_fri = [];
var working_hours_sat = [];
var working_hours_sun = [];
var selectedDistricts =  [];

class SelectDistrictWorkingHours extends Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelectMonday.bind(this);
        this.onRemove = this.onRemoveMonday.bind(this);
        this.onSelect = this.onSelectTuesday.bind(this);
        this.onRemove = this.onRemoveTuesday.bind(this);
        this.onSelect = this.onSelectWednesday.bind(this);
        this.onRemove = this.onRemoveWednesday.bind(this);
        this.onSelect = this.onSelectThursday.bind(this);
        this.onRemove = this.onRemoveThursday.bind(this);
        this.onSelect = this.onSelectFriday.bind(this);
        this.onRemove = this.onRemoveFriday.bind(this);
        this.onSelect = this.onSelectSaturday.bind(this);
        this.onRemove = this.onRemoveSaturday.bind(this);
        this.onSelect = this.onSelectSunday.bind(this);
        this.onRemove = this.onRemoveSunday.bind(this);
    }
    state = {
        account_id: null,
        province_id: null,
        provinces: null,
        district_id: null,
        districts: null,
        hourTxt:"",
        text:"",
        redirectToReferrer: false,
        hours : [
            { 'name' : '7:00-8:00', 'value': 7},
            { 'name': '8:00-9:00', 'value': 8},
            { 'name': '9:00-10:00', 'value': 9},
            { 'name': '10:00-11:00', 'value': 10},
            { 'name': '11:00-12:00', 'value': 11},
            { 'name': '12:00-13:00', 'value': 12},
            { 'name': '13:00-14:00', 'value': 13},
            { 'name': '14:00-15:00', 'value': 14},
            { 'name': '15:00-16:00', 'value': 15},
            { 'name': '16:00-17:00', 'value': 16},
            { 'name': '17:00-18:00', 'value': 17},
          ],
          getDistrictData: [],
          getHoursData: []
    };

    onSelectMonday(selectedList, selectedItem) {
        working_hours_mon.push({"hour":String(selectedItem.value), "day": "mon"})
        console.log(working_hours_mon);
    }
    onRemoveMonday(selectedList, selectedItem) {
        working_hours_mon = [];
        for(var i = 0; i <selectedList.length; i++)
        {
            working_hours_mon.push({"hour":String(selectedList[i].value), "day": "mon"});
        }
        console.log(working_hours_mon);
    }
    onSelectTuesday(selectedList, selectedItem) {
        working_hours_tue.push({"hour":String(selectedItem.value), "day": "tue"})
        console.log(working_hours_tue);
    }
    onRemoveTuesday(selectedList, selectedItem) {
        working_hours_tue = [];
        for(var i = 0; i <selectedList.length; i++)
        {
            working_hours_tue.push({"hour":String(selectedList[i].value), "day": "tue"});
        }
        console.log(working_hours_tue);
    }
    onSelectWednesday(selectedList, selectedItem) {
        working_hours_wed.push({"hour":String(selectedItem.value), "day": "wed"})
        console.log(working_hours_wed);
    }
    onRemoveWednesday(selectedList, selectedItem) {
        working_hours_wed = [];
        for(var i = 0; i <selectedList.length; i++)
        {
            working_hours_wed.push({"hour":String(selectedList[i].value), "day": "wed"});
        }
        console.log(working_hours_wed);
    }
    onSelectThursday(selectedList, selectedItem) {
        working_hours_thr.push({"hour":String(selectedItem.value), "day": "thr"})
        console.log(working_hours_thr);
    }
    onRemoveThursday(selectedList, selectedItem) {
        working_hours_thr = [];
        for(var i = 0; i <selectedList.length; i++)
        {
            working_hours_thr.push({"hour":String(selectedList[i].value), "day": "thr"});
        }
        console.log(working_hours_thr);
    }
    onSelectFriday(selectedList, selectedItem) {
        working_hours_fri.push({"hour":String(selectedItem.value), "day": "fri"})
        console.log(working_hours_fri);
    }
    onRemoveFriday(selectedList, selectedItem) {
        working_hours_fri = [];
        for(var i = 0; i <selectedList.length; i++)
        {
            working_hours_fri.push({"hour":String(selectedList[i].value), "day": "fri"});
        }
        console.log(working_hours_fri);
    }
    onSelectSaturday(selectedList, selectedItem) {
        working_hours_sat.push({"hour":String(selectedItem.value), "day": "sat"})
        console.log(working_hours_sat);
    }
    onRemoveSaturday(selectedList, selectedItem) {
        working_hours_sat = [];
        for(var i = 0; i <selectedList.length; i++)
        {
            working_hours_sat.push({"hour":String(selectedList[i].value), "day": "sat"});
        }
        console.log(working_hours_sat);
    }
    onSelectSunday(selectedList, selectedItem) {
        working_hours_sun.push({"hour":String(selectedItem.value), "day": "sun"})
        console.log(working_hours_sun);
    }
    onRemoveSunday(selectedList, selectedItem) {
        working_hours_sun = [];
        for(var i = 0; i <selectedList.length; i++)
        {
            working_hours_sun.push({"hour":String(selectedList[i].value), "day": "sun"});
        }
        console.log(working_hours_sun);
    }

    onSelectDisct(selectedList, selectedItem) {
        selectedDistricts.push({"district_id": selectedItem.value})
        console.log(selectedDistricts);
    }
    onRemoveDisct(selectedList, selectedItem) {
        selectedDistricts = [];
        for(var i = 0; i <selectedList.length; i++)
        {
            selectedDistricts.push({"district_id":selectedList[i].value});
        }
        console.log(selectedDistricts);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ account_id: params.account_id })
        axios.get(window.$globalAddress + '/province').then(res => {
            //console.log(res.data.data)
            if (res.data.status === 1) {
                this.setState({ provinces: res.data.data })
            }
        });

        axios.get(window.$globalAddress + '/account/seller/' +params.account_id ).then(res => {
            //console.log(res.data.data)
            if (res.data.status === 1) {
                this.setState({ getDistrictData: res.data.data.districts });
                this.setState({ getHoursData: res.data.data.working_times });
                console.log("DistrictData", res.data.data);
                

                var str ="Current selected districts:";
                if(res.data.data.districts !== null )
                    {
                        for(var i = 0; i < res.data.data.districts.length; i++)
                        { 
                            str = str + this.state.getDistrictData[i].province_name + "-" + this.state.getDistrictData[i].district_name + ",";
                        }
                        this.setState({text : str})
                    }

               str ="";
                if(res.data.data.working_times !== null )
                {
                    for(var i = 0; i < res.data.data.working_times.length; i++)
                    { 
                        str = str + res.data.data.working_times[i].day + "     :     " + res.data.data.working_times[i].hour + " , ";
                    }
                    str = str + " "
                    this.setState({hourTxt : str})
                }


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

    saveAll = event => {
        event.preventDefault();
        var selectedHours = [];
        selectedHours =  selectedHours.concat(working_hours_mon, working_hours_tue,working_hours_wed,working_hours_thr, working_hours_fri, working_hours_sat, working_hours_sun);
        console.log("selected hours: ", selectedHours);
        console.log("selected districts: ",selectedDistricts);
        var data = {
            districts : selectedDistricts,
            working_times: selectedHours
        }
             console.log("data: ", data);
        axios.post(window.$globalAddress + '/account/seller/' + this.state.account_id+ '/district_hour', data).then(res => { 
            console.log(res); 
            if (res.data.status === 1){
                this.setState({ redirectToReferrer: true})
                alert("Districts and working hours are updated.")
            }
            else {
                alert("Could not save the districts and working hours")
            }
            })
    };


    
    render() {

        
        if (this.state.redirectToReferrer === true ) {
            return <Redirect push to={'/arrangements/accountid=' +this.state.account_id} />
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
                <Navbar account_id={this.state.account_id}></Navbar>                           
                <br/><br/>
                <h3 className="workingHoursHeader" > Choose the district you will serve: </h3>
                <Container>
                    <Row>
                        <Col>
                            <FormGroup>
                                <h4>Provinces:</h4>
                                <Select onChange={this.provinceSelect}    
                                        options={display_provinces}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <h4>Districts:</h4>
                                <Multiselect 
                                        options={display_district} // Options to display in the dropdown
                                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                        onSelect={this.onSelectDisct} // Function will trigger on select event
                                        onRemove={this.onRemoveDisct} // Function will trigger on remove event
                                        displayValue="label" // Property name to display in the dropdown options
                            />
                            {this.state.text}
                            </FormGroup>
                        </Col>
                        
                    </Row>
                    <br/><br/><br/>
                    </Container>
                    <h3 className="workingHoursHeader"> Choose the working hours you will serve: </h3>

                    <Row>
                        <Col></Col>
                        <Col>
                            <h4>Monday:</h4>
                            <Multiselect 
                                        options={this.state.hours} // Options to display in the dropdown
                                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                        onSelect={this.onSelectMonday} // Function will trigger on select event
                                        onRemove={this.onRemoveMonday} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                            />
                        </Col>
                        <Col>
                            <h4>Tuesday:</h4>
                            <Multiselect 
                                        options={this.state.hours} // Options to display in the dropdown
                                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                        onSelect={this.onSelectTuesday} // Function will trigger on select event
                                        onRemove={this.onRemoveTuesday} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                            />                            
                         </Col>
                         <Col>
                            <h4>Wednesday:</h4>
                            <Multiselect 
                                        options={this.state.hours} // Options to display in the dropdown
                                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                        onSelect={this.onSelectWednesday} // Function will trigger on select event
                                        onRemove={this.onRemoveWednesday} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                            />                            
                        </Col>
                        <Col>
                            <h4>Thursday:</h4>
                            <Multiselect 
                                        options={this.state.hours} // Options to display in the dropdown
                                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                        onSelect={this.onSelectThursday} // Function will trigger on select event
                                        onRemove={this.onRemoveThursday} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                            />                            
                         </Col>                      
                         <Col>
                            <h4>Friday:</h4>
                            <Multiselect 
                                        options={this.state.hours} // Options to display in the dropdown
                                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                        onSelect={this.onSelectFriday} // Function will trigger on select event
                                        onRemove={this.onRemoveFriday} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                            />                           
                         </Col>
                         <Col>
                            <h4>Saturday:</h4>
                            <Multiselect 
                                        options={this.state.hours} // Options to display in the dropdown
                                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                        onSelect={this.onSelectSaturday} // Function will trigger on select event
                                        onRemove={this.onRemoveSaturday} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                            />                           
                         </Col>
                         <Col>
                            <h4>Sunday:</h4>
                            <Multiselect 
                                        options={this.state.hours} // Options to display in the dropdown
                                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                        onSelect={this.onSelectSunday} // Function will trigger on select event
                                        onRemove={this.onRemoveSunday} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                            />   
                            <Button className="saveButton btn-lg btn-dark"  onClick={this.saveAll}>Save All</Button>                       
                         </Col>
                        <Col className="mr-5"> Current selected hours: 
                            <Col></Col>
                            <Col>{this.state.hourTxt}</Col>
                        </Col>
                     </Row>
                     
                
            </div>

        )
    }
}

export default SelectDistrictWorkingHours;