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
        axios.get( window.$globalAddress + '/order/courier/' + params.account_id).then(res => {
            console.log(res)
            if (res.data.status === 1) {
                this.setState({ r: res.data.data })
                console.log(res.data.message)
                console.log(res.data.data)
            }
            else {
                window.confirm(res.data.message)
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

        var display = this.state.r.map (item => {
            const container = {};

            container["order_id"] = item.order_id;
            container["desired_delivery_date"] = item.desired_delivery_date;
            container["desired_delivery_time"] = item.desired_delivery_time;
            container["volume"] = item.volume;
            container["selName"] = item.selName;
            container["address_text"] = item.address_text;
            container["courier_status"] = item.courier_status;
            container["delivery_status"] = item.delivery_status;

            return container;
        })

        this.state.data = {
            columns: this.state.c,
            rows: display
        };
        return (
            <div>
                <Navbar account_id={this.state.account_id}/>
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
                            <Button className="btn-lg btn-dark mr-5 ml-25" onClick={this.seeDeliveyDetails} disabled={this.state.selectedDelivery===null}>Delivery Details</Button>
                        </div>
                    </div>
                </Container>
                <Footer />
            </div>
        )
    }
}

export default OrderTracking;