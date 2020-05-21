import React, { Component } from 'react'
import { Container } from 'reactstrap';
import { Button, Input } from 'reactstrap';
import DataTable from 'react-data-table-component';
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
            selectedCount: 0,
            data: [],
            columns: [  {
                name: 'ID',
                selector: 'order_id',
                sortable: true,
              },
              {
                name: 'Delivery Date',
                selector: 'desired_delivery_date',
                sortable: true,
              },
              {
                  name: 'Delivery Timeslot',
                  selector: 'desired_delivery_time',
                  sortable: true,
                },
                {
                  name: 'Volume',
                  selector: 'volume',
                  sortable: true,
                },
                {
                  name: 'Seller Name',
                  selector: 'seller',
                  sortable: true,
                },
                {
                  name: 'Receiver Address',
                  selector: 'address_text',
                  sortable: true,
                },       
                {
                  name: 'Acceptance Status',
                  selector: 'courier_status',
                  sortable: true,
                },
                {
                  name: 'Delivery Status',
                  selector: 'delivery_status',
                  sortable: true,
                }    
              ],
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

              for (var i = 0; i <res.data.data.length; i++ )
              {
                var tempName = "";
                tempName = tempName + res.data.data[i].seller.first_name + " " + res.data.data[i].seller.middle_name + " " + res.data.data[i].seller.last_name;
                res.data.data[i].seller = tempName
              }
              console.log(res.data.data)
                this.setState({ data: res.data.data })
                //console.log(res.data.message)
                //console.log(res.data.data)
            }
            else {
                console.log(res.data.message)
            }
        });
    }

    seeDeliveyDetails = event => {
        if(this.state.selectedCount !== 1)
        {
            alert("Please select only one sale!")
        }
        else{
            this.setState({redirectToOrderDetails : true})
        } 
    }

    handleChange = (state) => {
        console.log('Selected Rows: ', state.selectedRows);
        if(state.selectedRows.length > 0)
        {
          this.setState({ selectedDelivery: state.selectedRows[0].order_id })
          this.setState({ selectedCount: state.selectedRows.length })
          console.log("order ID:", state.selectedRows[0].order_id )
        }
  
      };

    render() {

        if (this.state.redirectToOrderDetails === true) {
            return <Redirect push to={`/deliverydetails/accountid=${this.state.account_id}/deliveryid=${this.state.selectedDelivery}`} />
        }

        return (
            <div>
                <Navbar account_id={this.state.account_id}/>
                <Container>
                    <DataTable
                        title="DELIVERY LIST"
                        columns={this.state.columns}
                        data={this.state.data}
                        selectableRows // add for checkbox selection
                        Clicked
                        onSelectedRowsChange={this.handleChange}
                    />
                    <br /> <br />
                    <div class="input-group mb-3" className="mt-4" style={{ float: 'right' }}>
                        <div class="input-group-prepend">
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