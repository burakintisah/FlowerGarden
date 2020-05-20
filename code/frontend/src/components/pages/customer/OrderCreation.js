import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Button } from 'reactstrap';
import Navbar from '../../layouts/NavbarCustomer'
import Footer from '../../layouts/Footer'
import { Redirect } from 'react-router-dom';
import styled from 'styled-components'
import Axios from 'axios';


const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5,
        }}
    />
);


class OrderCreation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account_id: null,
            district_id: null,
            arrangement_id: null,
            redirectToRecHome: false,
            arrangemetInfo: [],
            sellerInfo: [],

            time: null,
            date: null,
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({
            account_id: params.account_id,
            arrangement_id: params.arrangement_id,
            district_id: params.district_id,
            date: this.props.location.state.desired_date,
            time: this.props.location.state.desired_time
        });

        Axios.get(window.$globalAddress + `/arrangement/${params.arrangement_id}`).then(res => {
            console.log(res)
            if (res.data.status === 1) {
                this.setState({ arrangemetInfo: res.data.data })
            }
            else {
                console.log("No Arrangement Found")
            }

            Axios.get(window.$globalAddress + `/account/${res.data.data.seller_id}`).then(res => {
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


    orderClick = event => {
        event.preventDefault();
        //directing to the home page...
        this.setState({ redirectToRecInfo: true })
        console.log("BUTTON CLICKED")
    }

    render() {

        const redirectToRecInfo = this.state.redirectToRecInfo;
        //customer
        if (redirectToRecInfo === true) {
            return <Redirect push to= {{
                pathname: `/checkout/accountid=${this.state.account_id}/districtid=${this.state.district_id}/arrangementid=${this.state.arrangement_id}`,
                state: { 
                    desired_date: this.state.date,
                    desired_time: this.state.time
                }}
            }/>
        };
        return (
            <OrderContainer>

                <Navbar account_id={this.state.account_id}/>
                <Row>
                    <Col>
                        <Container className="showOrder">
                            <h1>Your Order</h1>
                            <ColoredLine color="black" />
                            <Row className="arr">
                                <Col><h4>Flower Arrangement</h4></Col>
                                <Col sm="1"><h4>Price</h4></Col>
                            </Row>
                            <ColoredLine color="black" />
                            <Row className="arr">
                                <Col sm="4">
                                    <img top width="100%"
                                        src="https://www.thespruce.com/thmb/3lsEN6GZna9lSnFiFS3aJl2u0Ts=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/Floom_Shus_DDG_0382_copy-5af06f0d8e1b6e0039e6e7c7.jpg"
                                        alt="..." class="img-thumbnail" />

                                </Col>
                                <Col>
                                    <h4 className="text-capitalize ">{this.state.arrangemetInfo.arrangement_name}</h4>
                                    <Row className='mt-3'>
                                        <Col><h5></h5></Col>
                                        <Col><h5>{}</h5></Col>
                                    </Row>
                                    <Row className='mt-1'>
                                        <Col><h5>Seller:</h5></Col>
                                        <Col><h5>{this.state.sellerInfo.first_name} {this.state.sellerInfo.last_name}</h5></Col>
                                    </Row>
                                    <Row className='mt-1'>
                                        <Col ><h5>Details:</h5></Col>
                                        <Col><h5>{this.state.arrangemetInfo.details}</h5></Col>
                                    </Row>

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
                                    <Button className="btn-lg btn-dark btn-block" onClick={this.orderClick}>Order</Button>
                                </div>
                            </Col>

                        </div>
                    </Col>
                </Row>
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
.details{
    font-size: 15px;
}

`;