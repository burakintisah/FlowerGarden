import React, { Component } from 'react'
import { Row } from 'reactstrap';
import { Button } from 'reactstrap';
import Navbar from '../../layouts/NavbarSeller'
import { Redirect } from 'react-router-dom';
import axios from 'axios';


//data yı düzenle

class SaleList extends Component {

    state = {
        redirectToReferrerAssignCourier: false,
        redirectToReferrerSalesPage: false,
        account_id: null,
        order_id: null,
        saleID: null,
        arrangementName: null,
        customerName: null,
        customerPhone: null,
        saleDate: null,
        deliveryDate: null,
        timeslot: null,
        message: null,
        orderStatus: null,
        courier_name: "",
        courierPhone: "",
        courier_email: "",

        seller_status: null,
        courier_status: "",
        customer_id: null
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ account_id: params.account_id })
        this.setState({ order_id: params.order_id })

        axios.get(window.$globalAddress + '/order/' + params.order_id).then(res => {
            if (res.data.status === 1) {
                console.log("The data:", res.data.data)
                this.setState({ saleID: res.data.data.order_id })
                this.setState({ arrangementName: res.data.data.arrangement_name })
                this.setState({ customer_id: res.data.data.customer_id })
                this.setState({ customerPhone: res.data.data.customer.phone })
                this.setState({ customerName: res.data.data.customer.first_name + " " + res.data.data.customer.last_name })
                this.setState({ saleDate: res.data.data.order_date })
                this.setState({ deliveryDate: res.data.data.delivery_date })
                this.setState({ timeslot: res.data.data.desired_delivery_time })
                this.setState({ message: res.data.data.message })
                this.setState({ orderStatus: res.data.data.delivery_status })
                this.setState({ courier_status: res.data.data.courier_status })


                //courier
                console.log(res.data.data)
                var courierName = ""
                if (res.data.data.courier_id !== null) {
                    if (res.data.data.courier.first_name !== null)
                        courierName = res.data.data.courier.first_name
                    if (res.data.data.courier.middle_name !== null)
                        courierName = courierName + " " + res.data.data.courier.middle_name
                    if (res.data.data.courier.last_name !== null)
                        courierName = courierName + " " + res.data.data.courier.last_name
                    this.setState({ courier_acceptance_status: res.data.data.courier_status })
                    this.setState({ courier_name: courierName })
                    this.setState({ courier_email: res.data.data.courier.email })
                    this.setState({ courierPhone: res.data.data.courier.phone })
                }

                this.setState({ seller_status: res.data.data.seller_status })

            }

        });
    }

    onDeliveredTo = event => {
        event.preventDefault();
        axios.get(window.$globalAddress + '/order/' + this.state.order_id + '/seller/on_delivery').then(res => {
            if (res.data.status === 1) {
                console.log("The data:", res.data.data);
                //alert("");

            }
            else {
                alert("Cannot reject the order");
            }

        });
        this.setState({ redirectToReferrerSalesPage: true })
    }

    onReject = event => {
        event.preventDefault();
        axios.get(window.$globalAddress + '/order/' + this.state.order_id + '/seller/reject').then(res => {
            if (res.data.status === 1) {
                console.log("The data:", res.data.data)
                alert("The order is succesfully rejected.");
            }
            else {
                alert("Cannot reject the order");
            }

        });
        this.setState({ redirectToReferrerSalesPage: true })
    }

    onAccept = event => {
        event.preventDefault();

        axios.get(window.$globalAddress + '/order/' + this.state.order_id + '/seller/accept').then(res => {
            if (res.data.status === 1) {
                console.log("The data:", res.data.data);
                alert("The order is succesfully accepted. Assign to the courier");
                this.setState({ redirectToReferrerSalesPage: true })
            }
            else {
                alert("Cannot accept the order");
            }

        });
    }

    assignCourier = event => {
        event.preventDefault();
        this.setState({ redirectToReferrerAssignCourier: true })
    }

    render() {


        if (this.state.redirectToReferrerAssignCourier === true) {
            return <Redirect push to={'/assign-courier/accountid=' + this.state.account_id + "/orderid=" + this.state.order_id} />
        }
        if (this.state.redirectToReferrerSalesPage === true) {
            return <Redirect push to={'/sale-list/seller/accountid=' + this.state.account_id} />
        }

        return (
            <div>
                <Navbar account_id={this.state.account_id}></Navbar>
                <br />
                <br />
                <Row>
                    <div className="col-md-4 col-sm-4"> </div>

                    <div className="col-md-6 col-sm-6">

                        <div class="input-group-prepend">
                            <h5>Sale ID: </h5> <div> {this.state.saleID}</div>
                        </div>


                        <div class="input-group-prepend">
                            <h5>Arrangement Name: </h5> <div> {this.state.arrangementName} </div>
                        </div>


                        <div class="input-group-prepend">
                            <h5>Customer Name: </h5> <div> {this.state.customerName} </div>
                        </div>


                        <div class="input-group-prepend">
                            <h5>Customer Phone:</h5> <div> {this.state.customerPhone} </div>
                        </div>

                        <div class="input-group-prepend">
                            <h5>Sale Date: </h5> <div> {this.state.saleDate} </div>
                        </div>

                        <div class="input-group-prepend">
                            <h5>Delivery Date:</h5> <div> {this.state.deliveryDate} </div>
                        </div>

                        <div class="input-group-prepend">
                            <h5>Desired Delivery Time:  </h5> <div> {this.state.timeslot} </div>
                        </div>

                        <div class="input-group-prepend">
                            <h5>Message:  </h5> <div> {this.state.message} </div>
                        </div>

                        <div class="input-group-prepend">
                            <h5>Order Staus:  </h5> <div> {this.state.orderStatus} </div>
                        </div>

                        <div class="input-group-prepend">
                            <h5>Courier Name:  </h5> <div> {this.state.courier_name} </div>
                        </div>

                        <div class="input-group-prepend">
                            <h5>Courier Phone: </h5> <div> {this.state.courierPhone} </div>
                        </div>

                        <div class="input-group-prepend">
                            <h5>Acceptance Status: </h5> <div> {this.state.seller_status} </div>
                        </div>
                        <div class="input-group-prepend">
                            <h5>Courier Status: </h5> <div> {this.state.courier_status} </div>
                        </div>

                    </div>

                    <div className="col-md-2 col-sm-2"> </div>
                </Row>
                <Row>
                    <div class="input-group mb-3" className="salePageButtons" >
                        <div class="input-group-prepend">
                            <Button className="btn-lg btn-dark mr-5 ml-10" disabled={this.state.courier_status !== "Accepted" } onClick={this.onDeliveredTo}>Delivered to Courier</Button>
                            <Button className="btn-lg btn-dark mr-5 ml-10" disabled={this.state.seller_status === "Assigned  to Courier" || this.state.seller_status === "Accepted"} onClick={this.onReject}>Reject Sale</Button>
                            <Button className="btn-lg btn-dark mr-5 ml-10" disabled={this.state.seller_status === "Assigned  to Courier" || this.state.seller_status === "Accepted"} onClick={this.onAccept}>Accept Sale</Button>
                            <Button className="btn-lg btn-dark mr-5 ml-10" disabled={this.state.seller_status !== "Accepted" && this.state.courier_status !== "Rejected"} onClick={this.assignCourier}>Assign to Courier</Button>

                        </div>
                    </div>
                </Row>


            </div>
        )
    }
}


export default SaleList;