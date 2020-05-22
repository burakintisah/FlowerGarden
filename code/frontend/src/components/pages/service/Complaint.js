import React, { Component } from 'react'
import {  Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../layouts/NavbarService'



const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5,
        }}
    />
);

class Complaint extends Component {
  
        state = {
            //complaint
            redirectToReferrer: false,
            account_id:null,
            complaint_id:null,
            complaint_date:null,
            complaint_status:null,

            //order
            order_id:null,
            order_date:null,
            expected_delivery_date:null,
            expected_delivery_timeslot:null,
            delivery_date:null,
            arrangement_name:null,
            price:null,
            payment_method:null,
            volume:null,
            delivery_type:null,
            arrangement_message:null,

            //seller
            seller_acceptance_status:null,
            seller_name:null,
            seller_phone:null,
            seller_email:null,
            seller_address:null,

            //courier
            courier_acceptance_status:"",
            courier_name:"",
            courier_phone:"",
            courier_email:"",

            //customer
            customer_name:null,
            customer_phone:null,
            customer_email:null,
            
            //receiver
            receiver_name:null,
            receiver_phone:null,
            receiver_email:null,


        }

        componentDidMount() {
            const { match: { params } } = this.props;
            this.setState({ account_id: params.account_id })
            this.setState({ complaint_id: params.complaint_id })
            this.setState({ order_id: params.order_id })

            axios.get(window.$globalAddress + '/complaint/?complaint_id=' +params.complaint_id + '&order_id=' + params.order_id).then(res => {
                if (res.data.status === 1) {
                    console.log("The data esra:", res.data.data.order)
                    
                    //complaint
                    this.setState({  complaint_date : res.data.data.complaint_date})
                    this.setState({  complaint_status : res.data.data.complaint_status})
                    //order
                    this.setState({  order_date: res.data.data.order.order_date})
                    this.setState({  expected_delivery_date: res.data.data.order.desired_delivery_date})
                    this.setState({  expected_delivery_timeslot: res.data.data.order.desired_delivery_time})
                    this.setState({  delivery_date: res.data.data.order.delivery_date})
                    this.setState({  arrangement_name: res.data.data.order.arrangement_name})
                    this.setState({  price: res.data.data.order.price})
                    this.setState({  payment_method : res.data.data.order.payment})
                    this.setState({  volume: res.data.data.order.volume})
                    this.setState({  delivery_type : res.data.data.order.delivery_type})
                    this.setState({  arrangement_message: res.data.data.order.message})

                    //seller
                    this.setState({  seller_acceptance_status: res.data.data.order.seller.seller_status})
                    this.setState({  seller_name: res.data.data.order.seller.first_name + " " + res.data.data.order.seller.middle_name + " " + res.data.data.order.seller.last_name})
                    this.setState({  seller_phone: res.data.data.order.seller.phone})
                    this.setState({  seller_email: res.data.data.order.seller.email})
                    this.setState({  seller_address: res.data.data.order.seller.address_text})

                    //courier
                    var courierName = ""
                    if (res.data.data.order.courier.first_name != null)
                        courierName = res.data.data.order.courier.first_name
                    if (res.data.data.order.courier.middle_name != null)
                        courierName = courierName + " " +res.data.data.order.courier.middle_name
                    if (res.data.data.order.courier.last_name != null)
                        courierName = courierName + " " +res.data.data.order.courier.last_name
                    this.setState({  courier_acceptance_status : res.data.data.order.courier_status})
                    this.setState({  courier_name : courierName})
                    this.setState({  courier_phone : res.data.data.order.courier.phone})
                    this.setState({  courier_email : res.data.data.order.courier.email})

                    //customer
                    this.setState({  customer_name : res.data.data.order.customer.first_name + " " + res.data.data.order.customer.middle_name + " " + res.data.data.order.customer.last_name})
                    this.setState({  customer_phone : res.data.data.order.customer.phone})
                    this.setState({  customer_email : res.data.data.order.customer.email})

                    //receiver
                    this.setState({  receiver_name : res.data.data.order.receiver_name})
                    this.setState({  receiver_phone : res.data.data.order.receiver_phone})
                    
              
                  }
                
            });
        }

        onSolved = event => {
            event.preventDefault();
            axios.get(window.$globalAddress + "/complaint/solved/?complaint_id=" + this.state.complaint_id + "&order_id=" + this.state.order_id).then(res => {
                if (res.data.status === 1) {
                    console.log("The data:", res.data.data);
                    alert("The complaint is succesfully solved. ");
                  }
                  else{
                      alert("Cannot solve the complaint");
                  }
                
            }); 
            this.setState({ redirectToReferrer: true})          
        }

        onReplied = event => {
            event.preventDefault();
            axios.get(window.$globalAddress + "/complaint/replied/?complaint_id=" + this.state.complaint_id + "&order_id=" + this.state.order_id).then(res => {
                if (res.data.status === 1) {
                    console.log("The data:", res.data.data);
                    alert("The complaint is succesfully replied. ");

                  }
                  else{
                      alert("Cannot reply the complaint");
                  }
            }); 
            this.setState({ redirectToReferrer: true})
        }
    render() {      
        if (this.state.redirectToReferrer === true) {
            return <Redirect push to={'/complaint-list/service/accountid=' + this.state.account_id}/>  
        }
        {}
        return (
            <div>
            <Navbar account_id={this.state.account_id}></Navbar>
            <br/>
            <br/>
            <Row>
            <Col className= "ml-5">
                <h3>Complaint Information</h3>
                <ColoredLine color = "black"/> 
                <div class="input-group-prepend">
                        <h5>Complaint ID: </h5> <div>  {this.state.complaint_id}</div>
                </div>                   
                <div class="input-group-prepend">
                    <h5>Complaint Date: </h5> <div> {this.state.complaint_date} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Complaint Status: </h5> <div> {this.state.complaint_status} </div>
                </div>

                <ColoredLine color = "black"/>
                <h3>Order Information</h3>
                <ColoredLine color = "black"/>

                <div class="input-group-prepend">
                    <h5>Order Date: </h5> <div> {this.state.order_date} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Expected Delivery Date: </h5> <div> {this.state.expected_delivery_date} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Expected Delivery Timeslot: </h5> <div> {this.state.expected_delivery_timeslot} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Delivery Date: </h5> <div> {this.state.delivery_date} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Arrangement Name: </h5> <div> {this.state.arrangement_name} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Price: </h5> <div> {this.state.price} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Payment Method: </h5> <div> {this.state.payment_method} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Volume: </h5> <div> {this.state.volume} </div>
                </div>
                <div class="input-group-prepend">
                    <h5> Delivery Type: </h5> <div> {this.state.delivery_type} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Arrangement Message: </h5> <div> {this.state.arrangement_message} </div>
                </div>
                   
                
            </Col>


            <Col>
                <h3>Seller Information</h3>
                <ColoredLine color = "black"/>
                <div class="input-group-prepend">
                    <h5>Acceptance Status: </h5> <div> {this.state.seller_acceptance_status} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Seller Name: </h5> <div> {this.state.seller_name} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Seller Phone: </h5> <div> {this.state.seller_phone} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Seller Email: </h5> <div> {this.state.seller_email} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Seller Address: </h5> <div> {this.state.seller_address} </div>
                </div>
                <ColoredLine color = "black"/>
                <h3>Courier Information</h3>
                <ColoredLine color = "black"/>
                <div class="input-group-prepend">
                    <h5>Acceptance Status: </h5> <div> {this.state.courier_acceptance_status} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Courier Name: </h5> <div> {this.state.courier_name} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Courier Phone: </h5> <div> {this.state.courier_phone} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Courier Email: </h5> <div> {this.state.courier_email} </div>
                </div>
                <ColoredLine color = "black"/>                  
            </Col> 


            <Col className= "mr-5">
                <h3>Customer Information</h3>
                <ColoredLine color = "black"/>
                <div class="input-group-prepend">
                    <h5>Customer Name: </h5> <div> {this.state.customer_name} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Customer Phone: </h5> <div> {this.state.customer_phone} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Customer Email: </h5> <div> {this.state.customer_email} </div>
                </div>
                <ColoredLine color = "black"/>
                <h3>Receiver Information</h3>
                <ColoredLine color = "black"/>
                <div class="input-group-prepend">
                    <h5>Receiver Name: </h5> <div> {this.state.receiver_name} </div>
                </div>
                <div class="input-group-prepend">
                    <h5>Receiver Phone: </h5> <div> {this.state.receiver_phone} </div>
                </div>

            </Col>
            </Row> 
         
            <div class="input-group mb-3" className="serviceComplaintButtons" >
                <div class="input-group-prepend">
                    <Button className="btn-lg btn-dark mr-5 ml-10"  onClick={this.onSolved}>Solved</Button>
                    <Button className="btn-lg btn-dark mr-5 ml-10"   onClick={this.onReplied}>Replied</Button>

                </div>
            </div>
          
            
                                                                        
            </div>
        )
    }
}


export default Complaint

;