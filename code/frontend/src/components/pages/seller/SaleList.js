import React, { Component } from 'react'
import { Container } from 'reactstrap';
import { Button} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Navbar from '../../layouts/NavbarSeller'

class SaleList  extends Component {

    state = {
        redirectToReferrer:false,
        account_id: null,
        selectedCount: 0,
        data : [ ],
        columns: [  {
          name: 'Arrangement Name',
          selector: 'arrangement_name',
        },
        {
          name: 'Sale Date',
          selector: 'order_date',
          sortable: true,
        },
        {
            name: 'Delivery Status',
            selector: 'delivery_status',
            sortable: true,
          },
          {
            name: 'Desired Delivery Date',
            selector: 'desired_delivery_date',
            sortable: true,
          },
          {
            name: 'Desired Delivery Time',
            selector: 'desired_delivery_time',
            sortable: true,
          },
          {
            name: 'Message',
            selector: 'message',
            sortable: true,
          },          
        ]
    }

    componentDidMount() {
      const { match: { params } } = this.props;
      this.setState({ account_id: params.account_id })
      axios.get(window.$globalAddress + '/order/seller/'+params.account_id).then(res => {
          if (res.data.status === 1) {
              this.setState({ data: res.data.data })
              console.log(res.data)
            }
            
      });
  }

  seeSaleDetails   = event => {
    event.preventDefault();
    if(this.state.selectedCount !== 1)
    {
        alert("Please select only one sale!")
    }
    else{
        this.setState({redirectToReferrer : true})
    } 

};

    handleChange = (state) => {
      // You can use setState or dispatch with something like Redux so we can use the retrieved data
      console.log('Selected Rows: ', state.selectedRows);
      if(state.selectedRows.length > 0)
      {
        this.setState({ saleID: state.selectedRows[0].order_id })
        this.setState({ selectedCount: state.selectedRows.length })
        console.log("sale ID:", state.selectedRows[0].order_id )
      }

    };

    render() {
        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return <Redirect push to={'/sale-page/accountid=' + this.state.account_id + '/orderid=' + this.state.saleID}/> 
        }
        
        return (
            <div>
               
               <Navbar account_id={this.state.account_id}></Navbar>
                <br />
                <br />
                

                <Container>
                <DataTable
                    title="SALES"
                    columns={this.state.columns}
                    data={this.state.data}
                    selectableRows // add for checkbox selection
                    Clicked
                    onSelectedRowsChange={this.handleChange}
                  />
                    <Button className=" serviceComplaintButtons btn-lg btn-dark mr-5 ml-10"  onClick={this.seeSaleDetails}>Sale Detail</Button>

                </Container>

            </div>
        )
    }
}


export default SaleList ;