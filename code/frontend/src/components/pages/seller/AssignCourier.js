import React, { Component } from 'react'
import {  Container, Row, Col } from 'reactstrap';
import { Button,  Input } from 'reactstrap';
import Navbar from '../../layouts/NavbarSeller'
import { MDBDataTable  } from 'mdbreact';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';


class AssignCourier extends Component {
  
        state = {
            redirectToReferrerSales: false,
            redirectToReferrerSalePage:false,
            account_id:null,
            order_id:null,
            arrangementName:null,
            deliveryDate:null,
            timeslot:null,
            assignableCouriers: null,
            seller_status:null,
            courier_id: null,
        }

        componentDidMount() {
            const { match: { params } } = this.props;
            this.setState({ account_id: params.account_id })
            this.setState({ order_id: params.order_id })

            axios.get('http://localhost:5000/order/' +params.order_id).then(res => {
                if (res.data.status === 1) {
                    console.log("The data:", res.data.data)
                    this.setState({ order_id : res.data.data.order_id })
                    this.setState({ arrangementName: res.data.data.arrangement_name })
                    this.setState({ deliveryDate: res.data.data.delivery_date })
                    this.setState({ timeslot: res.data.data.desired_delivery_time})
                  }
                
            });

            var str = 'http://localhost:5000/order/' + params.order_id + "/seller/assign"
            console.log("str:", str)
            axios.get('http://localhost:5000/order/' + params.order_id + "/seller/assign").then(res => {
                
                if (res.data.status === 1) {
                    console.log("courier data", res.data.data)
                    this.setState({ assignableCouriers: res.data.data })
                }
    
            });
        
        }

        assignEvent = event => {
            event.preventDefault();
            var data = { courier_id: this.state.courier_id }
            console.log("Sent data:", data)
            axios.post('http://localhost:5000/order/' + this.state.order_id+ "/seller/assign", data).then(res => {
                console.log("RES data:",res)    
                if (res.data.status === 1) {
                    this.setState({ redirectToReferrerSales: true })
                    alert("Arrangement is assigned.")
                }
                else {
                    alert("Assignment is unsuccessfull");
                }
    
            });
        };
  
        goBack = event => {
            event.preventDefault();
            this.setState({ redirectToReferrerSalePage: true })
        }

        
        courierSelect = cou => {
            console.log(`Option selected:`, cou.label);
            this.setState({ courier_id: cou.value })
        };


    render() {

        var display_couriers = []
        if (this.state.assignableCouriers != null) {
            display_couriers = this.state.assignableCouriers.map(item => {
                const container = {};

                container["value"] = item.account_id;
                container["label"] = item.first_name + " " + item.middle_name + " " + item.last_name; 

                return container;
            })

        }
        
        if (this.state.redirectToReferrerSales === true) {
            return <Redirect push to={'/sale-list/seller/accountid=' + this.state.account_id }/> 
        }
        if (this.state.redirectToReferrerSalePage === true) {
            return <Redirect push to={'/sale-page/accountid=' + this.state.account_id + "/orderid=" + this.state.order_id}/>  
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
                        <h3>Sale ID: </h3> <h5 className="mt-2"> {this.state.order_id}</h5>
                    </div>
                   
                   
                    <div class="input-group-prepend">
                         <h3>Arrangement Name: </h3> <h5 className="mt-2"> {this.state.arrangementName} </h5>
                    </div>
           
                    <div class="input-group-prepend">
                        <h3>Delivery Date:</h3> <h5 className="mt-2"> {this.state.deliveryDate} </h5>
                    </div>
                 
                    <div class="input-group-prepend">
                        <h3>Desired Delivery Time:  </h3> <h5 className="mt-2"> {this.state.timeslot} </h5>
                    </div>

                    
                        <h3>Courier:  </h3> 
                        <Select className= "mt-3" onChange={this.courierSelect}
                        options={display_couriers}
                    />   
                </div>

            <div className="col-md-2 col-sm-2"> </div>
            </Row>
            
            <Row>
            <div class="input-group mb-3" className="" >
                        <div class="input-group-prepend assignPageButtons">

                            <Button className="btn-lg btn-dark mr-3"  onClick={this.goBack}>Back</Button>
                            <Button className="btn-lg btn-dark "  onClick={this.assignEvent}>Assign</Button>

                        </div>
                    </div>
            </Row>
            
                                                                        
            </div>
        )
    }
}


export default AssignCourier;