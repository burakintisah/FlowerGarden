import React, { Component } from 'react'

import {  Container } from 'reactstrap';
import { Button,  Input } from 'reactstrap';
import { MDBDataTable  } from 'mdbreact';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../layouts/NavbarCustomer'
import Footer from '../../layouts/Footer'


class OrderTracking extends Component {


    state = {
        account_id: null,
        redirectToOrderDetails: false,

         data : {
            columns:  [ {label: '#',field: 'id',},
                       { label: 'Occasions',field: 'occasion',}
                      ],
            rows: [{'id': 1, 'occasion': 'Birthday'}
                  ]
                }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ account_id: params.account_id })
        console.log(this.state.account_id)
        axios.get(`http://localhost:5000/order/customer/${this.params.account_id}`).then(res => {
            //console.log(res.data.data)
            if (res.data.status === 1) {
                this.setState({ provinces: res.data.data })
            }

        });
    }



    render() {
        return (
            <div>
            <Navbar />
            <Container>
            <MDBDataTable
                striped
                bordered
                small
                data={[]}
            />
            <br /> <br />
            <div class="input-group mb-3" className="mt-4" style={{float: 'right'}}>
                <div class="input-group-prepend">
                    <Input className="mr-5" style={{width: '350px'}} type="text" placeholder="Enter the id of the order..."  onChange={this.takeFlowerName}/>
                    <Button className="btn-lg btn-dark mr-5 ml-25"  onClick={this.orderDetails}>Order Details</Button>
                </div>
            </div>
            </Container>
            <Footer/>
            </div>
        )
    }
}

export default OrderTracking;