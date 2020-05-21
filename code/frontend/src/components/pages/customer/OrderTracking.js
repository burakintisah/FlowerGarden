import React, { Component } from 'react'

import { Container } from 'reactstrap';
import { Button, Input } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../layouts/NavbarCustomerNew'
import Footer from '../../layouts/Footer'


// WEIRD BUG WHEN ORDER HAS MESSAGE UI SHOWS MESSAGE AS ID
class OrderTracking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account_id: null,
            district_id: null,
            
            data: [],

            columns: [  {
                name: 'ID',
                selector: 'order_id',
                sortable: true,
              },
              {
                name: 'Flower Arrangement Name',
                selector: 'arrangement_name',
                sortable: true,
              },
              {
                  name: 'Price',
                  selector: 'price',
                  sortable: true,
                },
                {
                  name: 'Desired Delivery Date',
                  selector: 'desired_delivery_date',
                  sortable: true,
                },
                {
                  name: 'Delivery Status',
                  selector: 'delivery_status',
                  sortable: true,
                },
                {
                  name: 'Seller',
                  selector: 'seller_status',
                  sortable: true,
                },       
                {
                  name: 'Courier',
                  selector: 'courier_status',
                  sortable: true,
                }   
              ],
              selectedCount: 0,           

            selectedOrder: null,
            redirectToOrderDetails: false
        }
    }

    // All orders are taken!
    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ account_id: params.account_id })
        axios.get( window.$globalAddress +'/order/customer/' + params.account_id).then(res => {
            console.log("ALL DATA")
            console.log(res)
            if (res.data.status === 1) {
                this.setState({ data: res.data.data })
                console.log(res.data.message)
                console.log(res.data.data)
            }
            else {
                console.log(res.data.message)
            }
        });
    }

    seeOrderDetails = event => {
        event.preventDefault();
        if(this.state.selectedCount !== 1)
        {
            alert("Please select only one order!")
        }
        else{
            this.setState({redirectToOrderDetails : true})
        } 
    }

    handleChange = (state) => {
        // You can use setState or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', state.selectedRows);
        if(state.selectedRows.length > 0)
        {
          this.setState({ selectedOrder: state.selectedRows[0].order_id })
          this.setState({ selectedCount: state.selectedRows.length })
          console.log("order ID:", state.selectedRows[0].order_id )
        }
    };

    render() {

        if (this.state.redirectToOrderDetails === true){
            return <Redirect push to={`/orderdetails/accountid=${this.state.account_id}/orderid=${this.state.selectedOrder}`} />
        }
        
        return (
            <div>
                <Navbar account_id={this.state.account_id} district_id= {this.state.district_id}/>
                <Container>
                    <DataTable
                        title="ORDER TRACKING"
                        columns={this.state.columns}
                        data={this.state.data}
                        selectableRows // add for checkbox selection
                        Clicked
                        onSelectedRowsChange={this.handleChange}
                    />
                    <br /> <br />
                    <div class="input-group mb-3" className="mt-4" style={{ float: 'right' }}>
                        <div class="input-group-prepend">
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