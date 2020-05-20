import React, { Component } from 'react'

import { Container } from 'reactstrap';
import { Button, Input } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../layouts/NavbarCustomer'
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
                { label: 'Flower Arrangement Name', field: 'arrangement_name' },
                { label: 'Price', field: 'price' },
                { label: 'Order Date', field: 'order_date' },
                { label: 'Delivery Status', field: 'delivery_status' },
                { label: 'Seller', field: 'seller_status' },
                { label: 'Courier', field: 'courier_status' },
            ],
            data: [],

            selectedOrder: null,
            redirectToOrderDetails: false
        }
    }

    // All orders are taken!
    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ account_id: params.account_id })
        axios.get( window.$globalAddress +'/order/customer/' + params.account_id).then(res => {
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

    takeOrderId = event => { event.preventDefault(); this.setState({ selectedOrder: event.target.value }); console.log(this.state.selectedOrder); }

    seeOrderDetails = event => {
        this.setState({redirectToOrderDetails: true})
    }

    render() {

        if (this.state.redirectToOrderDetails === true){
            return <Redirect push to={`/orderdetails/accountid=${this.state.account_id}/orderid=${this.state.selectedOrder}`} />
        }
        
        
        var display = this.state.r.map (item => {
            const container = {};

            container["order_id"] = item.order_id;
            container["arrangement_name"] = item.arrangement_name;
            container["price"] = item.price;
            container["order_date"] = item.order_date;
            container["delivery_status"] = item.delivery_status;
            container["seller_status"] = item.seller_status;
            container["courier_status"] = item.courier_status;

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
                            <Input className="mr-5" style={{ width: '350px' }} type="text" placeholder="Enter the id of the order..." onChange={this.takeOrderId} />
                            <Button className="btn-lg btn-dark mr-5 ml-25" onClick={this.seeOrderDetails}disabled={this.state.selectedOrder===null}>Order Details</Button>
                        </div>
                    </div>
                </Container>
                <Footer />
            </div>
        )
    }
}

export default OrderTracking;