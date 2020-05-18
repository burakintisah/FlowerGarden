import React, { Component } from 'react'
import { Container, Row, Col, Input, FormGroup, Button } from 'reactstrap';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components'
import Axios from 'axios';

import Navbar from '../../layouts/NavbarCustomer'
import Footer from '../../layouts/Footer'

const deliveryTypes = [
    { value: 'hand', label: 'Hand' },
    { value: 'ring_the_bell', label: 'Ring The Bell' },
    { value: 'call_seller', label: 'Call Seller' },
];
var displaySavedAdress = [];
var displayCreditCard = [];
const paymentMethods = [
    { value: 'cash', label: 'Cash' },
    { value: 'card', label: 'Credit Card' },
    { value: 'havale', label: 'Havale' },
];
class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account_id: null,
            district_id: null,
            arrangement_id: null,
            arrangemetInfo: [],
            sellerInfo: [],

            showPayment: false,
            saved_adress: null,
            paymentType: null,

            order_date: "2008-01-01 00:00:01",
            delivery_date: "2008-11-11",

            receiverNameSurname: "",
            receiverPhone: "",
            receiverAdress: "",
            deliveryType: "",
            message: "",

            delivery_status: "Preparing",
            seller_status: "Pending",
            courier_status: "Not Assigned",
            desired_delivery_date: "2008-05-01",
            desired_delivery_time: "09:34:21.000001",
            courier_id: null,

            creditCard: "",
            nameOnCard: "",
            cardDate: "",
            cardCVV: "",

            boolSaveCreditCard: false,
            boolSaveAdress: false,

            redirect: false,
            order_id: "",

            addrNotempty: false

        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        var time = today + " 00:00:01"
        
        this.setState({
            account_id: params.account_id,
            arrangement_id: params.arrangement_id,
            district_id: params.district_id,
            delivery_date: today,
            desired_delivery_date:today,
            order_date: time,
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

        Axios.get(`http://localhost:5000/account/customer/${params.account_id}/saved_addresses`).then(res => {
            console.log(res)
            if (res.data.status === 1) {
                this.setState({ saved_adress: res.data.data })

                displaySavedAdress = res.data.data.map(item => {
                    const result = {};

                    result["value"] = item.district_id;
                    result["label"] = item.address;
                    console.log(item.adress)
                    return result;
                })
            }
            else {
                console.log("No Arrangement Found")
            }

        });
        Axios.get(`http://localhost:5000/account/customer/${params.account_id}`).then(res => {
            console.log(res)
            if (res.data.status === 1) {

                displayCreditCard = [{ value: res.data.data.credit_card, label: res.data.data.credit_card }]


            }
            else {
                console.log("No Credit Card Found")
            }

        });


    }

    addressSelect = dist => { console.log(`Option selected:`, dist.value); this.setState({ customerAddress: dist.value, receiverAdress: dist.label, addrNotempty: true }) };
    deliverySelect = dist => { console.log(`Option selected:`, dist.value); this.setState({ deliveryType: dist.value }) };

    changeName = event => { event.preventDefault(); this.setState({ receiverNameSurname: event.target.value }); console.log(this.state.receiverNameSurname); }
    changePhone = event => { event.preventDefault(); this.setState({ receiverPhone: event.target.value }); console.log(this.state.receiverPhone); }
    changeAdress = event => { event.preventDefault(); this.setState({ receiverAdress: event.target.value, addrNotempty: true }); console.log(this.state.receiverAdress); }
    changeMessage = event => { event.preventDefault(); this.setState({ message: event.target.value }); console.log(this.state.message); }

    continuePayment = dist => { this.setState({ showPayment: true }) };

    paymentSelect = dist => { console.log(`Option selected:`, dist.value); this.setState({ paymentType: dist.value }) };
    cardSelect = dist => { console.log(`Option selected:`, dist.value); this.setState({ creditCard: dist.value }) };

    saveCreditCardCheckbox = event => { this.setState({ boolSaveCreditCard: !(this.state.boolSaveCreditCard) }); console.log(this.state.boolSaveCreditCard); }
    saveAdressCheckbox = event => { this.setState({ boolSaveAdress: !(this.state.boolSaveAdress) }); console.log(this.state.boolSaveAdress); }

    changeCreditCard = event => { event.preventDefault(); this.setState({ creditCard: event.target.value }); console.log(this.state.creditCard); }
    changeNameOnCard = event => { event.preventDefault(); this.setState({ nameOnCard: event.target.value }); console.log(this.state.nameOnCard); }
    changeDate = event => { event.preventDefault(); this.setState({ cardDate: event.target.value }); console.log(this.state.cardDate); }
    changeCVV = event => { event.preventDefault(); this.setState({ cardCVV: event.target.value }); console.log(this.state.cardCVV); }

    finishOrder = dist => {
        console.log("BUTTON CLICKED")

        let data = {
            payment: this.state.paymentType,
            order_date: this.state.order_date,
            receiver_name: this.state.receiverNameSurname,
            receiver_phone: this.state.receiverPhone,
            district_id: this.state.district_id,
            address_text: this.state.receiverAdress,
            delivery_date: this.state.delivery_date,
            delivery_type: this.state.deliveryType,
            delivery_status: this.state.delivery_status,
            desired_delivery_date: this.state.desired_delivery_date,
            desired_delivery_time: this.state.desired_delivery_time,
            message: this.state.message,
            seller_status: this.state.seller_status,
            courier_status: this.state.courier_status,
            seller_id: this.state.arrangemetInfo.seller_id,
            courier_id: this.state.courier_id,
            customer_id: this.state.account_id,
            arrangement_id: this.state.arrangement_id
        };

        console.log(data)

        Axios.post("http://localhost:5000/order", data).then(res => {
            console.log(res)
            if (res.data.status === 1) {
                this.setState({ orderid: res.data.data })
                console.log(res.data.message)
                this.setState({ redirect: true });
            }
            else {
                console.log(res.data.message)
            }

        });

        if (this.state.boolSaveCreditCard === true) {
            let credData = [{
                credit_card: this.state.creditCard
            }];
            Axios.post(`http://localhost:5000/account/customer/${this.state.account_id}/credit_card`, credData).then(res => {
                console.log(res)
                if (res.data.status === 1) {
                    console.log("Credit Card Saved")
                    console.log(res.data.message)
                }
                else {
                    console.log(res.data.message)
                }

            });

        }
        if (this.state.boolSaveAdress === true) {
            let addData = [{
                address: this.state.receiverAdress,
                district_id: this.state.district_id,
                customer_id: this.state.account_id
            }];
            Axios.post(`http://localhost:5000/account/customer/${this.state.account_id}/saved_addresses`, addData).then(res => {
                console.log(res)
                if (res.data.status === 1) {
                    console.logo("Address Saved")
                    console.log(res.data.message)
                }
                else {
                    console.log(res.data.message)
                }
            });
        }

        

    }

    render() {

        const redirect = this.state.redirect;
        //customer
        if (redirect === true) {
            return <Redirect push to={`/ordertracking/accountid=${this.state.account_id}`} />
        };

        return (

            <CheckoutContainer>
                <Navbar />
                <Row>
                    <Col>
                        <Container className="showOrder" hidden={this.state.showPayment}>
                            <h1>Receiver Information</h1>
                            <FormGroup className="arr">
                                <Input type="text" placeholder="Receiver Name and Surname" onChange={this.changeName} />
                            </FormGroup>
                            <FormGroup className="arr">
                                <Input type="text" placeholder="Receiver Phone" onChange={this.changePhone} />
                            </FormGroup>
                            <FormGroup className="arr">
                                <Input type="text" placeholder="Adress" onChange={this.changeAdress} />
                            </FormGroup>
                            <FormGroup className="arr">
                                <Row>
                                    <Col><h5 className="    mt-1">Choose from saved adress: </h5></Col>
                                    <Col> <Select onChange={this.addressSelect} options={displaySavedAdress} /></Col>
                                </Row>
                            </FormGroup>
                            <FormGroup className="arr">
                                <Row>
                                    <Col><h5 className="    mt-1">Delivery Type: </h5></Col>
                                    <Col> <Select onChange={this.deliverySelect} options={deliveryTypes} /></Col>
                                </Row>
                            </FormGroup>
                            <FormGroup className="arr">
                                <Input type="text" placeholder="Message" onChange={this.changeMessage} />
                            </FormGroup>
                        </Container>

                        <Container className="showOrder" hidden={!this.state.showPayment}>
                            <p1 className="mb-5 font-weight-bold">Receiver Adress:</p1>
                            <p1>{this.state.receiverAdress}</p1>
                            <h1 className="mt-2">Payment Method</h1>
                            <FormGroup className="arr">
                                <Row>
                                    <Col sm="7"> <Select onChange={this.paymentSelect} options={paymentMethods} /></Col>
                                </Row>
                            </FormGroup>
                            <FormGroup className="arr">
                                <Row>
                                    <Col><Input type="text" placeholder="Credit Card Number" onChange={this.changeMessage} /></Col>
                                    <Col><Select onChange={this.cardSelect} options={displayCreditCard} /></Col>
                                </Row>

                            </FormGroup>
                            <FormGroup className="arr">
                                <Row>
                                    <Col><Input type="text" placeholder="Name on Card" onChange={this.changeMessage} /></Col>
                                    <Col><Input type="text" placeholder="MM / YY" onChange={this.changeMessage} /></Col>
                                    <Col><Input type="password" placeholder="CCV" onChange={this.changeMessage} /></Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row className="arr ml-2">
                                    <input type="checkbox" aria-label="Checkbox for following text input" className="mt-1" onChange={this.saveCreditCardCheckbox} />
                                    <h6 className="ml-5">Save credit card number</h6>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <h5>Remember Receiver</h5>
                                <Row className="arr ml-2">
                                    <input className="mt-1" type="checkbox" aria-label="Checkbox for following text input" onChange={this.saveAdressCheckbox} />
                                    <h6 className="ml-5">Save the receiver adress for a faster checkout</h6>
                                </Row>
                            </FormGroup>
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
                                    <Button className="btn-lg btn-dark btn-block" onClick={this.continuePayment} disabled={!this.state.addrNotempty} hidden={this.state.showPayment}>Continue Payment</Button>
                                    <Button className="btn-lg btn-dark btn-block" onClick={this.finishOrder} hidden={!this.state.showPayment}>Order</Button>
                                </div>
                            </Col>

                        </div>
                    </Col>
                </Row>
                <Footer />
            </CheckoutContainer>

        )
    }
}

export default Checkout;



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
    margin-top: 5%;
}
.details{
    font-size: 15px;
}
.mess{
    max-height: 100px
}

`;