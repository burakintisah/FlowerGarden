import React, { Component } from 'react'
import {  Container, Row, Col } from 'reactstrap';
import { Button,  Input } from 'reactstrap';
import Navbar from '../../layouts/NavbarSeller'
import { MDBDataTable  } from 'mdbreact';
import { Redirect} from 'react-router-dom';
import axios from 'axios';


//data yı düzenle

class SaleList extends Component {
  
        state = {
            redirectToReferrerAssignCourier: false,
            redirectToReferrerSalesPage:false,
            account_id:null,
            order_id:null,
            saleID:null,
            arrangementName:null,
            customerName:null,
            customerPhone:null,
            saleDate:null,
            deliveryDate:null,
            timeslot:null,
            message:null,
            orderStatus:null,
            courier_name:null,
            courierPhone:null,
            courier_email:null,
            seller_status:null,
            customer_id: null
        }

        componentDidMount() {
            const { match: { params } } = this.props;
            this.setState({ account_id: params.account_id })
            this.setState({ order_id: params.order_id })
            
            axios.get(window.$globalAddress + '/order/' +params.order_id).then(res => {
                if (res.data.status === 1) {
                    console.log("The data:", res.data.data)
                    this.setState({ saleID : res.data.data.order_id })
                    this.setState({ arrangementName: res.data.data.arrangement_name })
                    this.setState({ customer_id: res.data.data.customer_id }) 
                    this.setState({ customerPhone: res.data.data.customer.phone }) 
                    this.setState({ customerName : res.data.data.customer.first_name + " " +res.data.data.customer.last_name })
                    this.setState({ saleDate: res.data.data.order_date })
                    this.setState({ deliveryDate: res.data.data.delivery_date })
                    this.setState({ timeslot: res.data.data.desired_delivery_time})
                    this.setState({ message: res.data.data.message })
                    this.setState({ orderStatus: res.data.data.delivery_status })


                    //courier
                    var courierName = ""
                    if (res.data.data.courier.first_name != null)
                        courierName = res.data.data.courier.first_name
                    if (res.data.data.courier.middle_name != null)
                        courierName = courierName + " " +res.data.data.courier.middle_name
                    if (res.data.data.courier.last_name != null)
                        courierName = courierName + " " +res.data.data.courier.last_name
                    this.setState({  courier_acceptance_status : res.data.data.courier_status})
                    this.setState({  courier_name : courierName})
                    this.setState({  courier_email : res.data.data.courier.email})
                    this.setState({ courierPhone: res.data.data.courier.phone })
                    this.setState({ seller_status: res.data.data.seller_status })
              
                  }
                
            });
        }

        onDeliveredTo = event => {
            event.preventDefault();
            axios.get(window.$globalAddress + '/order/' +this.state.order_id+ '/seller/on_delivery').then(res => {
                if (res.data.status === 1) {
                    console.log("The data:", res.data.data);
                    //alert("");

                  }
                  else{
                      alert("Cannot reject the order");
                  }
                
            }); 
            this.setState({ redirectToReferrerSalesPage: true})
        }

        onReject = event => {
            event.preventDefault();
            axios.get(window.$globalAddress + '/order/' +this.state.order_id+ '/seller/reject').then(res => {
                if (res.data.status === 1) {
                    console.log("The data:", res.data.data)
                    alert("The order is succesfully rejected.");
                  }
                  else{
                      alert("Cannot reject the order");
                  }
                
            });
            this.setState({ redirectToReferrerSalesPage: true})
        }
  
        onAccept = event => {
            event.preventDefault();

            axios.get(window.$globalAddress + '/order/' +this.state.order_id+ '/seller/accept').then(res => {
                if (res.data.status === 1) {
                    console.log("The data:", res.data.data);
                    alert("The order is succesfully accepted. Assign to the courier");

                  }
                  else{
                      alert("Cannot reject the order");
                  }
                
            });           
        }

        assignCourier = event => {
            event.preventDefault();
            this.setState({ redirectToReferrerAssignCourier: true})
        }

    render() {

        
        if (this.state.redirectToReferrerAssignCourier === true) {
            return <Redirect push to={'/assign-courier/accountid=' + this.state.account_id + "/orderid=" + this.state.order_id }/>  
        }
        if (this.state.redirectToReferrerSalesPage === true) {
            return <Redirect push to={'/sale-list/seller/accountid=' + this.state.account_id }/>  
        }
        
        return (
            <div>
            <Navbar />
            <h1 className='ml-3 mt-3'>FlowerGarden</h1>
            <br/>
            <br/>
            <Row>
            <div className="col-md-4 col-sm-4"> </div>

            <div className="col-md-6 col-sm-6">
                    
                    <div class="input-group-prepend">
                        <h3>Sale ID: </h3> <h5 className="mt-2"> {this.state.saleID}</h5>
                    </div>
                   
                   
                    <div class="input-group-prepend">
                         <h3>Arrangement Name: </h3> <h5 className="mt-2"> {this.state.arrangementName} </h5>
                    </div>
                    
                    
                    <div class="input-group-prepend">
                        <h3>Customer Name: </h3> <h5 className="mt-2"> {this.state.customerName} </h5>
                    </div>
                   
                    
                    <div class="input-group-prepend">
                        <h3>Customer Phone:</h3> <h5 className="mt-2"> {this.state.customerPhone} </h5>
                    </div>
               
                    <div class="input-group-prepend">
                        <h3>Sale Date: </h3> <h5 className="mt-2"> {this.state.saleDate} </h5>
                    </div>
           
                    <div class="input-group-prepend">
                        <h3>Delivery Date:</h3> <h5 className="mt-2"> {this.state.deliveryDate} </h5>
                    </div>
                 
                    <div class="input-group-prepend">
                        <h3>Desired Delivery Time:  </h3> <h5 className="mt-2"> {this.state.timeslot} </h5>
                    </div>
                  
                    <div class="input-group-prepend">
                         <h3>Message:  </h3> <h5 className="mt-2"> {this.state.message} </h5>
                    </div>
                   
                    <div class="input-group-prepend">
                        <h3>Order Staus:  </h3> <h5 className="mt-2"> {this.state.orderStatus} </h5>
                    </div>
                   
                   <div class="input-group-prepend">
                        <h3>Courier Name:  </h3> <h5 className="mt-2"> {this.state.courier_name} </h5>
                    </div>
                   
                    <div class="input-group-prepend">
                        <h3>Courier Phone: </h3> <h5 className="mt-2"> {this.state.courierPhone} </h5>
                    </div>
                
                    <div class="input-group-prepend">
                        <h3>Acceptance Status: </h3> <h5 className="mt-2"> {this.state.seller_status} </h5>
                    </div>
                    
                    </div>

                <div className="col-md-2 col-sm-2"> </div>
            </Row>
            <Row>
            <div class="input-group mb-3" className="salePageButtons" >
                        <div class="input-group-prepend">
                            <Button className="btn-lg btn-dark mr-5 ml-10"  disabled = {this.state.seller_status !== "Assigned to Courier"} onClick={this.onDeliveredTo}>Delivered to Courier</Button>
                            <Button className="btn-lg btn-dark mr-5 ml-10"  disabled = {this.state.seller_status === "Assigned to Courier"} onClick={this.onReject}>Reject Sale</Button>
                            <Button className="btn-lg btn-dark mr-5 ml-10"  disabled = {this.state.seller_status === "Assigned to Courier" || this.state.seller_status === "Accepted"} onClick={this.onAccept}>Accept Sale</Button>
                            <Button className="btn-lg btn-dark mr-5 ml-10"  disabled = {this.state.seller_status !== "Accepted"} onClick={this.assignCourier}>Assign to Courier</Button>

                        </div>
                    </div>
            </Row>
            
                                                                        
            </div>
        )
    }
}


export default SaleList;