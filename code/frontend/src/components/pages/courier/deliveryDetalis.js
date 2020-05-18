import React, { Component } from 'react'
import Navbar from '../../layouts/NavbarCourier'
import Footer from '../../layouts/Footer'
import { Row, Col, Container, Button } from 'reactstrap'
import styled from 'styled-components'
import axios from 'axios'

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5,
        }}
    />
);
class DeliveryDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account_id: null,
            delivery_id: null,
            enableDelivered: false,
            canceled: false,
            deliveredReceiver: false,

            delInfo: [],


            selPhone: "",
            selAdress: "",
            selName: ""
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({
            account_id: params.account_id,
            delivery_id: params.delivery_id
        })

        axios.get('http://localhost:5000/order/' + params.delivery_id).then(res => {
            console.log(res)
            if (res.data.status === 1) {
                this.setState({
                    delInfo: res.data.data,
                    selName: res.data.data.seller.first_name + " " +  res.data.data.seller.middle_name  +  " "  +  res.data.data.seller.last_name
                })
                console.log(res.data.message)
                

            }
            else {
                console.log(res.data.message)
            }
        });
    }

    acceptDel = event => {
        this.setState({ enableDelivered: true })
    }

    cancelDel = event => {
        this.setState({ canceled: true })
    }

    delToRec = event => {
        this.setState({ deliveredReceiver: true })
    }



    render() {

        if (this.state.delInfo != null) {
        }
        return (
            <DeliveryContainer>
                <Navbar />
                <Row className="start">
                    <Col className="del-info">
                        <Container >

                            <h1>Delivery Information</h1>
                            <ColoredLine color="black" />
                            <Row>
                                <Col className="fon">Delivery ID:</Col>
                                <Col className="fon">{this.state.delInfo.order_id}</Col>
                            </Row>
                            <Row>
                                <Col className="fon">Delivery Date:</Col>
                                <Col className="fon">{this.state.delInfo.desired_delivery_date}</Col>
                            </Row>
                            <Row>
                                <Col className="fon">Timeslot:</Col>
                                <Col className="fon">{this.state.delInfo.desired_delivery_time}</Col>
                            </Row>
                            <Row>
                                <Col className="fon">Volume:</Col>
                                <Col className="fon">{this.state.delInfo.volume}</Col>
                            </Row>
                            <Row>
                                <Col className="fon">Delivery Type:</Col>
                                <Col className="fon">{this.state.delInfo.delivery_type}</Col>
                            </Row>
                            
                            <Row className="btn-mrg ">
                                <Col sm="4">
                                    <Button className="mt-4 btn-lg btn-dark mr-5 ml-25 btn-block" onClick={this.cancelDel} disabled={this.state.enableDelivered}>Cancel Delivery</Button>
                                </Col>
                                <Col sm="4">
                                    <Button className="mt-4 btn-lg btn-dark mr-5 ml-25 btn-block" onClick={this.acceptDel} disabled={(this.state.enableDelivered) || (this.state.canceled)}>Accept Delivery</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6">
                                    <Button className="mt-4 btn-lg btn-dark btn-block" onClick={this.delToRec} disabled={!this.state.enableDelivered}>Deliveried to Receiver</Button>
                                </Col>
                            </Row>




                        </Container>

                    </Col>
                    <Col className="sel-info">
                        <Container>

                            <h1>Seller Information</h1>
                            <ColoredLine color="black" />
                            <Row>
                                <Col className="fon">Seller Name:</Col>
                                <Col className="fon">{this.state.selName}</Col>
                            </Row>
                            <Row>
                                <Col className="fon">Seller Phone:</Col>
                                <Col className="fon">{this.state.selPhone}</Col>
                            </Row>
                            <Row>
                                <Col className="fon">Seller Address:</Col>
                                <Col className="fon">{this.state.selAdress}</Col>
                            </Row>
                            <h1 className="info-margin">Receiver Information</h1>
                            <ColoredLine color="black" />
                            <Row>
                                <Col className="fon">Receiver Name:</Col>
                                <Col className="fon">{this.state.delInfo.receiver_name}</Col>
                            </Row>
                            <Row>
                                <Col className="fon">Receiver Phone:</Col>
                                <Col className="fon">{this.state.delInfo.receiver_phone}</Col>
                            </Row>
                            <Row>
                                <Col className="fon">Receiver Address:</Col>
                                <Col className="fon">{this.state.delInfo.address_text}</Col>
                            </Row>

                        </Container>
                    </Col>
                </Row>
                <Footer />
            </DeliveryContainer>
        )
    }
}

export default DeliveryDetails;



const DeliveryContainer = styled.div`
.start {
    margin-top:4%;
}
.del-info{
    margin-left:10%
}
.info-margin{
    margin-top:2%
}
.fon {
    margin-top: 5px;
    font-size: 30px;
}
.btn-mrg {
    margin-top: 25%
}


`;