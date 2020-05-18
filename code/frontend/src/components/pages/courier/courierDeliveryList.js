import React, { Component } from 'react'

import { Container } from 'reactstrap';
import { Button, Input } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../layouts/NavbarCourier'
import Footer from '../../layouts/Footer'


// WEIRD BUG WHEN ORDER HAS MESSAGE UI SHOWS MESSAGE AS ID
class OrderTracking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account_id: null,
            
            r: [],

            c: [
                { label: 'ID', field: 'order_id' },
                { label: 'Delivery Date', field: 'arrangement_name' },
                { label: 'Delivery Timeslot', field: 'price' },
                { label: 'Volume', field: 'order_date' },
                { label: 'Seller Name', field: 'delivery_status' },
                { label: 'Receiver Address', field: 'seller_status' },
                { label: 'Acceptance Status', field: 'courier_status' },
                { label: 'Delivery Status Status', field: 'courier_status' },
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
        axios.get('http://localhost:5000/order/customer/' + params.account_id).then(res => {
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
        this.setState({redirectToOrderDetails: true})
    }

    render() {

        if (this.state.redirectToOrderDetails === true){
            return <Redirect push to={`/deliverydetails/accountid=${this.state.account_id}/deliveryid=${this.state.selectedDelivery}`} />
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