import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navbar from '../../layouts/NavbarCustomer';
import Footer from '../../layouts/Footer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import FlowerCard from './FlowerCard';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account_id: null,
            province_id: null,
            district_id: null,
            day: "mon",
            hour: 12,
            occasions: [{
                "occasion_name": "Anniversary"
            }],
            flowers: [{
                "flower_id": 5
            }],
            display_content: []
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.updateValues(params)
        //console.log(params.district_id)

        var data = {
            district_id: params.district_id,
            day: this.state.day,
            hour: this.state.hour,
            occasions: this.state.occasions,
            flowers: this.state.flowers
        }
        console.log("This is DATA")
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
    }

    updateValues(params) {
        this.setState({
            account_id: params.account_id,
            district_id: params.district_id
        })
    };


    render() {


        let flowCards = this.state.display_content.map(flower => {
            return (
                <Col sm="4"> <FlowerCard flower={flower} /></Col>
            )
        });

        return (
            <div>
                <Navbar />
                <Container>
                    
                    <Row>
                        {flowCards}
                    </Row>
                   
                </Container >
                <Footer />
            </div>


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
.details {
    font-size: 15px;
}
`;