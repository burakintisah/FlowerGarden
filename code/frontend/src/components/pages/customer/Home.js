import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Button } from 'reactstrap';
import Select from 'react-select';
import Navbar from '../../layouts/NavbarCustomer';
import Footer from '../../layouts/Footer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import FlowerCard from './FlowerCard';

const displayOccasions = [
    { value: 'Birthday', label: 'Birthday' },
    { value: 'Anniversary', label: 'Anniversary' },
    { value: 'Congratulations', label: 'Congratulations' },
    { value: 'Just', label: 'Just' }
]

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account_id: null,
            district_id: null,
            day: "mon",
            hour: 12,
            occasions: [],
            flowers: [],
            display_content: []
        }

    }



    componentDidMount() {
        const { match: { params } } = this.props;
        this.updateValues(params)
        //c onsole.log(params.district_id)

        var data = {
            district_id: params.district_id,
            day: this.state.day,
            hour: this.state.hour,
            occasions: this.state.occasions,
            flowers: this.state.flowers
        }

        axios.post("http://localhost:5000/arrangement", data).then(res => {
            console.log(res.data.data)
            if (res.data.status === 1) {
                this.setState({ display_content: res.data.data })
            }
            else {
                console.log("No Arrangement Found")
            }

        });

        //to get flowers
        axios.get("http://localhost:5000/flower").then(res => {
            console.log(res.data.data)
            if (res.data.status === 1) {
                this.setState({ flowers: res.data.data })
            }
            else {
                console.log("No Flower Found")
            }

        });
    };

    updateValues(params) {
        this.setState({
            account_id: params.account_id,
            district_id: params.district_id
        })
    };

    // when filter button clicked
    handleSubmit = event => {
        event.preventDefault();
        var data = {
            district_id: this.state.district_id,
            day: this.state.day,
            hour: this.state.hour,
            flowers: [
                {
                    "flower_id": 5
                }
            ],
            occasions: this.state.occasions,
            //flowers: this.state.flowers

        }
        console.log(data)
        axios.post("http://localhost:5000/arrangement", data).then(res => {
            console.log(res.data.data)
            if (res.data.status === 1) {
                this.setState({ display_content: res.data.data })
            }
            else {
                console.log("No Arrangement Found")
            }

        });
    };

    onChangeOccasions = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        this.setState({ occasions: newValue })
    };
    onChangeFlowers = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        this.setState({ occasions: newValue })
    };

    render() {


        const displayFlowers = []

        let flowCards = this.state.display_content.map(flower => {
            return (
                <Col sm="2" mr-5 ><FlowerCard flower={flower} account_id={this.state.account_id} /></Col>
            )
        });

        return (
            <HomeContainer>
                <Navbar />
                <div>

                    <Row>
                        <Col sm="2" className="filter">
                            <Form className="login-form bk" onSubmit={this.handleSubmit}>
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

                                <div className="col-md-6 co">
                                    <Button className="btn-plc btn-lg btn-dark btn-block mt-3 ml-5">Filter</Button>
                                </div>
                            </Form>
                        </Col>
                        {flowCards}


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