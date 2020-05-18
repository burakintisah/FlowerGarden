import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Button } from 'reactstrap';
import Navbar from '../../layouts/NavbarCustomer'
import Footer from '../../layouts/Footer'
import { Redirect } from 'react-router-dom';
import styled from 'styled-components'
import Axios from 'axios';

class OrderDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account_id: null,
            order_id: null,

            redirect: false,
            orderInfo: null,
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({
            account_id: params.account_id,
            order_id: params.order_id,
        });

        Axios.get(`http://localhost:5000/order/${params.order_id}`).then(res => {
            console.log(res);
            if (res.data.status === 1) {
                this.setState({ orderInfo: res.data.data })
            }
            else {
                console.log("There is no such order")
            }
        });

    }
    render() {

        if (this.state.orderInfo != null) {

            console.log(this.state.orderInfo.seller)
            return (
                <CheckoutContainer>

                    <Navbar />
                    <div>

                        <Row>
                            <Col>
                                <Container className="showOrder">
                                    <h1>Your Order</h1>
                                    <Row className="arr">
                                        <Col><h5>Flower Arrangement</h5></Col>
                                        <Col sm="1"><h5>Price</h5></Col>
                                    </Row>
                                    <Row className="arr">
                                        <Col sm="4">
                                            <img top width="100%"
                                                src="https://www.thespruce.com/thmb/3lsEN6GZna9lSnFiFS3aJl2u0Ts=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/Floom_Shus_DDG_0382_copy-5af06f0d8e1b6e0039e6e7c7.jpg"
                                                alt="..." class="img-thumbnail" />

                                        </Col>
                                        <Col>
                                            <h4 className="text-capitalize ">{this.state.orderInfo.arrangement_name}</h4>
                                            <Row className='mt-4'>
                                                <Col sm="4"><h5>Date:</h5></Col>
                                                <Col ><h5>{this.state.orderInfo.desired_delivery_date}</h5></Col>
                                            </Row>
                                            <Row className='mt-1'>
                                                <Col sm="4"><h5>TimeSlot:</h5></Col>
                                                <Col><h5>{this.state.orderInfo.desired_delivery_time}</h5></Col>
                                            </Row>
                                        </Col>
                                        <Col sm="1 mt-5"><h4>${this.state.orderInfo.price}</h4></Col>
                                    </Row>
                                    <h5 className="arr">Receiver Information</h5>
                                    <Row>
                                        <Col sm="3"><h6 className="arr">Receiver Name: </h6></Col>
                                        <Col className="mt-1"><h7>{this.state.orderInfo.receiver_name}</h7></Col>

                                    </Row>
                                    <Row>
                                        <Col sm="3"><h6 className="arr">Receiver Phone: </h6></Col>
                                        <Col className="mt-1"><h7>{this.state.orderInfo.receiver_phone}</h7></Col>

                                    </Row>


                                    <Row>
                                        <Col sm="3"><h6 className="arr">Address: </h6></Col>
                                        <Col className="mt-1"><h7>{this.state.orderInfo.address_text}</h7></Col>
                                    </Row>

                                    <Row>
                                        <Col sm="3"><h6 className="arr">Delivery Type: </h6></Col>
                                        <Col className="mt-1"><h7>{this.state.orderInfo.delivery_type}</h7></Col>
                                    </Row>

                                    <Row>
                                        <Col sm="3"><h6 className="arr">Message: </h6></Col>
                                        <Col className="mt-1"><h7>{this.state.orderInfo.message}</h7></Col>
                                    </Row>
                                </Container>
                            </Col>
                            <Col sm="4">
                                <div className="summary">
                                    <h1>Summary</h1>
                                    <Row className="mt-5">
                                        <Col>
                                            <h3 className="mb-4">Subtotal</h3>
                                            <h3 className="mb-4">Delivery</h3>
                                            <h3 className="mb-2">Tax</h3>
                                            <br></br>
                                            <h3>-----------------------</h3>
                                            <br></br><br></br>
                                            <h3 >Total</h3>
                                        </Col>
                                        <Col>
                                            <h3 className="mb-4">${this.state.orderInfo.price}</h3>
                                            <h3 className="mb-4">-</h3>
                                            <h3 className="mb-2">-</h3>
                                            <br></br>
                                            <h3>----</h3>
                                            <br></br><br></br>
                                            <h3>${this.state.orderInfo.price}</h3>
                                        </Col>
                                    </Row>
                                    <Col sm="7">
                                        <div className="mt-3">
                                            <Row className="mt-2">
                                                <Col sm="6"><h5>Order Status: </h5></Col>
                                                <Col>{this.state.orderInfo.delivery_status}</Col>
                                            </Row>
                                            <Row className="mt-2">
                                                <Col sm="6"><h5>Seller:</h5></Col>
                                                <Col><h7>{this.state.orderInfo.seller.first_name} {this.state.orderInfo.seller.middle_name} {this.state.orderInfo.seller.last_name}</h7></Col>
                                            </Row>
                                            <Row className="mt-2">
                                                <Col sm="6"><h5>Courier: </h5></Col>
                                                <Col><h7>{this.state.orderInfo.courier.first_name} {this.state.orderInfo.courier.middle_name} {this.state.orderInfo.courier.last_name}</h7></Col>

                                            </Row>

                                            <Row className="mt-3">
                                                <Col><Button className="btn-lg btn-dark btn-block" onClick={this.orderClick}>Comment</Button></Col>
                                                <Col><Button className="btn-lg btn-dark btn-block" onClick={this.orderClick}>Complaint</Button></Col>
                                            </Row>

                                        </div>
                                    </Col>

                                </div>
                            </Col>

                        </Row>

                    </div >
                    <Footer />
                </CheckoutContainer>


            )


        }
        else {
            return (
                <div></div>
            )
        }

    }
}

export default OrderDetails;



const CheckoutContainer = styled.div`
.summary{
    width: 100%;
    max-width: 700px;
    padding: 15px;
    margin: auto;
    height: 100%;
    margin-top:20%;
    margin-bottom:10%
  }

.showOrder{
    width: 100%;
    max-width: 700px;
    padding: 15px;
    margin: auto;
    height: 100%;
    margin-top:10%;
    margin-bottom:10%
}
.btn-crt{
    margin-top: 15%;
}
.arr {
    margin-top:5%;
    
}
.details{
    font-size: 15px;
}

`;