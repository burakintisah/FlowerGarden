import React, { Component } from 'react'

import { Container } from 'reactstrap';
import { Button, Input } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../layouts/NavbarCourier'
import Footer from '../../layouts/Footer'

var selName = "";
// WEIRD BUG WHEN ORDER HAS MESSAGE UI SHOWS MESSAGE AS ID
class OrderTracking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account_id: null,

            r: [],

            c: [
                { label: 'ID', field: 'order_id' },
                { label: 'Delivery Date', field: 'desired_delivery_date' },
                { label: 'Delivery Timeslot', field: 'desired_delivery_time' },
                { label: 'Volume', field: 'volume' },
                { label: 'Seller Name', field: 'selName' },
                { label: 'Receiver Address', field: 'address_text' },
                { label: 'Acceptance Status', field: 'courier_status' },
                { label: 'Delivery Status', field: 'delivery_status' },
            ],
            data: [],

            selectedDelivery: null,
            redirectToOrderDetails: false
        }
    }

    // All deliveries are taken!
    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ account_id: params.account_id })
        axios.get('http://localhost:5000/order/courier/' + params.account_id).then(res => {
            //console.log(res)
            if (res.data.status === 1) {
                this.setState({ r: res.data.data })
                console.log(res.data.message)
                console.log(res.data.data)
            }
            else {
                console.log(res.data.message)
            }
        });
    }

    takeDeliveryId = event => { event.preventDefault(); this.setState({ selectedDelivery: event.target.value }); console.log(this.state.selectedDelivery); }

    seeDeliveyDetails = event => {
        this.setState({ redirectToOrderDetails: true })
    }

    render() {

        if (this.state.redirectToOrderDetails === true) {
            return <Redirect push to={`/deliverydetails/accountid=${this.state.account_id}/deliveryid=${this.state.selectedDelivery}`} />
        }

        if (this.state.r != null) {
            this.state.r.map(item => {
                item["selName"] = item.seller.first_name + " " + item.seller.middle_name + " " + item.seller.last_name
            })
        }

        this.state.data = {
            columns: this.state.c,
            rows: this.state.r
        };
        return (
            <div>
                <Navbar />
                <Container>
                    <MDBDataTable
                        striped
                        bordered
                        small
                        data={this.state.data}
                    />
                    <br /> <br />
                    <div class="input-group mb-3" className="mt-4" style={{ float: 'right' }}>
                        <div class="input-group-prepend">
                            <Input className="mr-5" style={{ width: '350px' }} type="text" placeholder="Enter the id of the order..." onChange={this.takeDeliveryId} />
                            <Button className="btn-lg btn-dark mr-5 ml-25" onClick={this.seeDeliveyDetails}>Delivery Details</Button>
                        </div>
                    </div>
                </Container>
                <Footer />
            </div>
        )
    }
}

export default OrderTracking;