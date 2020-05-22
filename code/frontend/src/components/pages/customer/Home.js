import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Button } from 'reactstrap';
import Select from 'react-select';
import Navbar from '../../layouts/NavbarCustomer';
import Footer from '../../layouts/Footer';
import styled from 'styled-components';
import axios from 'axios';
import FlowerCard from './FlowerCard';
import DatePicker from 'react-date-picker';

const displayOccasions = [
    

    { value: 'Birthday', label: 'Birthday' },
    { value: 'Anniversary', label: 'Anniversary' },
    { value: 'Congratulations', label: 'Congratulations' },
    { value: 'Just Because', label: 'Just Because' }
];

const displayPrices = [
    { key: 1, value: { upper: 10, lower: 0 }, label: '0 - 10' },
    { key: 2, value: { upper: 30, lower: 10 }, label: '10 - 30' },
    { key: 3, value: { upper: 50, lower: 30 }, label: '30 - 50' },
    { key: 4, value: { upper: 70, lower: 50 }, label: '50 - 70' }
];

const options = [
    { value: '7', label: '7:00' },
    { value: '8', label: '8:00' },
    { value: '9', label: '9:00' },
    { value: '10', label: '10:00' },
    { value: '11', label: '11:00' },
    { value: '12', label: '12:00' },
    { value: '13', label: '13:00' },
    { value: '14', label: '14:00' },
    { value: '15', label: '15:00' },
    { value: '16', label: '16:00' },
    { value: '17', label: '17:00' }
];

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account_id: null,
            district_id: null,
            day: "mon",
            hour: 12,
            flowersAll: [],
            display_content: [],
            searchKey: "",
            searchUsed: false,

            occasions: null,
            flowers: null,

            priceFilter: null,

            date: new Date(),
            time: null,
            selectedDay: null,
            selectedHour: null
        }

    }


    componentDidMount() {
        console.group("When component Did mount")
        const { match: { params } } = this.props;
        this.updateValues(params)
        //console.log(params.district_id)

        var data = {
            district_id: params.district_id,
        }

        //to get flowers
        axios.get(window.$globalAddress + "/flower").then(res => {
            //console.log(res.data.data)
            if (res.data.status === 1) {
                this.setState({ flowersAll: res.data.data })
            }
            else {
                console.log("No Flower Found")
            }

        });
        console.groupEnd();

        this.fetchData(data)
        console.groupEnd();

    };


    componentDidUpdate(prevProps) {

        if (this.props.match !== prevProps.match) {
            console.log("URL CHANGED")
            const { match: { params } } = this.props;
            this.updateValues(params)
            var data = {
                district_id: params.district_id,
                day: this.state.day,
                hour: this.state.hour,
                occasions: this.state.occasions,
                flowers: this.state.flowers,
                search_text: params.search_key
            }
            this.fetchData(data)
        }
    }

    fetchData(data) {
        console.group("FETCH STARTED")
        axios.post(window.$globalAddress + "/arrangement/customer", data).then(res => {
            console.log(res.data.data)
            if (res.data.status === 1) {
                this.setState({ display_content: res.data.data })
            }
            else {
                console.log("No Arrangement Found")
            }
        });
        console.groupEnd();
    }

    updateValues(params) {
        this.setState({
            account_id: params.account_id,
            district_id: params.district_id,
            searchKey: params.search_key
        })
    };

    // when filter button clicked
    handleSubmit = event => {
        console.group('Filter Clicked');
        event.preventDefault();
        var data = { district_id: parseInt(this.state.district_id) };

        if (this.state.selectedHour !== null && this.state.selectedDay !== null) {
            data.hour = this.state.selectedHour
            data.day = this.state.selectedDay
        }


        if (this.state.occasions !== null) {
            data.occasions = this.state.occasions.map(item => {
                const result = {};
                result["occasion_name"] = item.value;
                return result;
            })
        }

        if (this.state.flowers !== null) {
            data.flowers = this.state.flowers.map(item => {
                const result = {};
                result["flower_id"] = item.value;
                return result;
            })
        }

        if (this.state.priceFilter !== null) {
            data.price = this.state.priceFilter.map(item => {
                const result = {};
                result["upper"] = item.value.upper;
                result["lower"] = item.value.lower;
                return result;
            })

        }
        console.log(data)
        this.fetchData(data)
        console.groupEnd();
    };

    // getting the values from the filter selects
    onChangeOccasions = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        if (newValue !== null) {
            if ((newValue).length !== 0) {
                this.setState({ occasions: newValue })
            }
            else {
                this.setState({ flowers: null })
            }
        }
        else {
            this.setState({ occasions: null })
        }
        console.groupEnd()

    };

    onChangeFlowers = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        if (newValue !== null) {
            if ((newValue).length !== 0) {
                this.setState({ flowers: newValue })
            }
            else {
                this.setState({ flowers: null })
            }

        }
        else {
            this.setState({ flowers: null })
        }

    };

    onChangePrices = (newValue, actionMeta) => {
        console.group('Price Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        if (newValue !== null) {
            if ((newValue).length !== 0) {
                this.setState({ priceFilter: newValue })
            }
            else {
                console.log("eq null")
                this.setState({ priceFilter: null })
            }

        }
        else {
            console.log("eq null")
            this.setState({ priceFilter: null })
        }

        console.groupEnd();
    };

    onDateChange = date => {
        this.setState({ date });
        if (date !== null) {
            var str = date.toString();
            var splitted = str.split(" ");

            this.setState({ selectedDay: splitted[0].toLowerCase() });

        }
        else {
            this.setState({ selectedDay: null });
        }

    }

    onTimeChange = time => {
        this.setState({ time }); console.log(time.label);
        this.setState({ selectedHour: time.value })
        console.log(this.state.selectedHour)
    }


    render() {


        let displayFlowers = []
        if (this.state.flowersAll != null) {
            displayFlowers = this.state.flowersAll.map(item => {
                const result = {};

                result["value"] = item.flower_id;
                result["label"] = item.flower_name;

                return result;
            })
        }

        let flowCards = this.state.display_content.map(flower => {
            return (
                <FlowerCard flower={flower} account_id={this.state.account_id} district_id={this.state.district_id} />
            )
        });

        const { selectedOption } = this.state;

        return (

            <HomeContainer>

                <Navbar account_id={this.state.account_id} district_id={this.state.district_id} />
                <div>

                    <Row>
                        <Col sm="2" className="filter ml-3" >
                            <Form className="login-form bk" onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label> Price </Label>
                                    <Select onChange={this.onChangePrices}
                                        options={displayPrices}
                                        isMulti
                                        className="basic-multi-select"
                                        classNamePrefix="select" />
                                </FormGroup>
                                <FormGroup>
                                    <Label> Flowers Contained</Label>
                                    <Select onChange={this.onChangeFlowers}
                                        options={displayFlowers}
                                        isMulti
                                        className="basic-multi-select"
                                        classNamePrefix="select" />
                                </FormGroup>
                                <FormGroup>
                                    <Label> Occasions </Label>
                                    <Select onChange={this.onChangeOccasions}
                                        options={displayOccasions}
                                        isMulti
                                        className="basic-multi-select"
                                        classNamePrefix="select" />
                                </FormGroup>
                                <FormGroup>
                                    <Label> Hour </Label>
                                    <Select
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        onChange={this.onTimeChange}
                                        value={selectedOption}
                                        options={options}
                                    />
                                </FormGroup>
                                <div> Day </div>
                                <DatePicker
                                    className="homeSelectDay mb-3 mt-2"
                                    onChange={this.onDateChange}
                                    value={this.state.date}
                                />
                                <div className="col-md-6 co">
                                    <Button className="btn-plc btn-lg btn-dark btn-block mt-3 ml-5">Filter</Button>
                                </div>
                            </Form>
                        </Col>
                        <Col style={{ maxWidth: '50000px' }}>
                            <Row> {flowCards} </Row>

                        </Col>





                    </Row>

                </div >
                <Footer />
            </HomeContainer>


        )
    }
}

export default Home;

const HomeContainer = styled.div`
.login-form{
    width: 100%;
    max-width: 700px;
    padding: 15px;
    margin: auto;
    height: 100%;
    margin-top:8%;
    margin-bottom:10%
  }
.filter {
    margin-top:10%;
    font-size: 15px;
}

.showcard {
    font-size: 15px;
}

`;