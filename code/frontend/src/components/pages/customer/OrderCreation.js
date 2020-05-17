import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Button } from 'reactstrap';
import Navbar from '../../layouts/NavbarCustomer'
import Footer from '../../layouts/Footer'
import { Redirect } from 'react-router-dom';
import styled from 'styled-components'
import Axios from 'axios';

class OrderCreation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account_id: null,
            arrangement_id: null,
            redirectToOrderPage: false,
            arrangemetInfo: []
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({
            account_id: params.account_id,
            arrangement_id: params.arrangement_id
        });
        Axios.get(`http://localhost:5000/arrangement/${params.arrangement_id}`).then(res => {
            console.log(res)
            if (res.data.status === 1) {
                this.setState({ arrangemetInfo: res.data.data })
            }
            else {
                console.log("No Arrangement Found")
            }

        });


    }

    render() {

        const redirectToOrderPage = this.state.redirectToReferrer;
        //customer
        if (redirectToOrderPage === true) {
            return <Redirect to={`//accountid=${this.props.account_id}`} />
        };
        return (
            <OrderContainer>

                <Navbar />
                <div>

                    <Row>
                        <Col>
                            <Container className="showOrder">
                                <h1>Your Order</h1>
                                <Row className="arr">
                                    <Col><h4>Flower Arrangement</h4></Col>
                                    <Col sm="1"><h4>Price</h4></Col>
                                </Row>
                                <Row className="arr">
                                    <Col sm="4">
                                        <img top width="100%"
                                            src="https://www.thespruce.com/thmb/3lsEN6GZna9lSnFiFS3aJl2u0Ts=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/Floom_Shus_DDG_0382_copy-5af06f0d8e1b6e0039e6e7c7.jpg"
                                            alt="..." class="img-thumbnail" />

                                    </Col>
                                    <Col>
                                        <h4 className="text-capitalize ">{this.state.arrangemetInfo.arrangement_name}</h4>
                                        <h5 className='mt-3'>Count: {this.state.arrangemetInfo.count}</h5>
                                        <h5 className='mt-3'>Details: {this.state.arrangemetInfo.details}</h5>
                                    </Col>
                                    <Col sm="1 mt-5"><h4>${this.state.arrangemetInfo.price}</h4></Col>
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
                                        <Button className="btn-lg btn-dark btn-block">Order</Button>
                                    </div>
                                </Col>

                            </div>
                        </Col>

                    </Row>

                </div >
                <Footer />
            </OrderContainer>
        )
    }
}

export default OrderCreation;


const OrderContainer = styled.div`
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

`;