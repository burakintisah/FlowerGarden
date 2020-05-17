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
            district_id:null,
            arrangement_id: null,
            arrangemetInfo: [],
            sellerInfo: [],
            redirect: false
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({
            account_id: params.account_id,
            arrangement_id: params.arrangement_id,
            district_id: params.district_id
        });

        Axios.get(`http://localhost:5000/arrangement/${params.arrangement_id}`).then(res => {
            console.log(res)
            if (res.data.status === 1) {
                this.setState({ arrangemetInfo: res.data.data })
            }
            else {
                console.log("No Arrangement Found")
            }

            Axios.get(`http://localhost:5000/account/${res.data.data.seller_id}`).then(res => {
                console.log(res)
                if (res.data.status === 1) {
                    this.setState({ sellerInfo: res.data.data })
                }
                else {
                    console.log("No Arrangement Found")
                }

            });

        });
    }
    render() {
        return (
            <CheckoutContainer>

                <Navbar />
                <div>

                    <Row>
                        <Col>
                            <Container className="showOrder">
                                <h1>Your Order</h1>
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
                                        <br></br><br></br><br></br>
                                        <h3 >Total</h3>
                                    </Col>
                                    <Col>
                                        <h3 className="mb-4">${this.state.arrangemetInfo.price}</h3>
                                        <h3 className="mb-4">-</h3>
                                        <h3 className="mb-2">-</h3>
                                        <br></br>
                                        <h3>----</h3>
                                        <br></br><br></br><br></br>
                                        <h3>${this.state.arrangemetInfo.price}</h3>
                                    </Col>
                                </Row>
                                <Col sm="7">
                                    <div className="btn-crt">
                                        <Button className="btn-lg btn-dark btn-block" onClick={this.orderClick}>Order</Button>
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