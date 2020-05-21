import React, { Component } from 'react'
import { Container } from 'reactstrap';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Navbar from '../../layouts/NavbarService'



class ComplaintList  extends Component {

    state = {
        redirectToReferrer:false,
        account_id: null,
        complaint_id: null,
        order_id:null,
        selectedCount: 0,
        data : [ ],
        columns: [  
        {
            name: 'Complaint ID',
            selector: 'complaint_id',
            sortable: true,
        }, 
        {
          name: 'Status',
          selector: 'complaint_status',
        },
        {
          name: 'Order ID',
          selector: 'order_id',
          sortable: true,
        },
        {
            name: 'Customer Email',
            selector: 'customer_email',
            sortable: true,
          },
          {
            name: 'Seller Email',
            selector: 'seller_email',
            sortable: true,
          },
          {
            name: 'Complaint Date',
            selector: 'complaint_date',
            sortable: true,
          },
         
        ]
    }

    componentDidMount() {
      const { match: { params } } = this.props;
      this.setState({ account_id: params.account_id })
      axios.get(window.$globalAddress + '/complaint/account/'+params.account_id).then(res => {
          if (res.data.status === 1) {
              this.setState({ data: res.data.data })
              console.log(res.data)
            }
            
      });
  }

  seeComplaintDetails   = event => {
    event.preventDefault();
    if(this.state.selectedCount !== 1)
    {
        alert("Please select only one complaint!")
    }
    else{
        this.setState({redirectToReferrer : true})
    } 

};

    handleChange = (state) => {
      console.log('Selected Rows: ', state.selectedRows);
      if(state.selectedRows.length > 0)
      {
        this.setState({ order_id: state.selectedRows[0].order_id })
        this.setState({ complaint_id: state.selectedRows[0].complaint_id })
        this.setState({ selectedCount: state.selectedRows.length })
        console.log("complaint id: :", state.selectedRows[0].complaint_id )
      }

    };

    render() {
        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return <Redirect push to={'/complaint/service/accountid=' + this.state.account_id + '/complaintid=' + this.state.complaint_id + '/orderid=' + this.state.order_id}/> 
        }

        return (
            <div>
               <Navbar account_id={this.state.account_id}></Navbar>
                <br />
                <br />
                <Container>
                <DataTable
                    title="COMPLAINTS"
                    columns={this.state.columns}
                    data={this.state.data}
                    selectableRows // add for checkbox selection
                    Clicked
                    onSelectedRowsChange={this.handleChange}
                  />
                    <Button className=" serviceComplaintButtons btn-lg btn-dark mr-5 ml-10"  onClick={this.seeComplaintDetails}> See Complaint Detail</Button>

                </Container>

            </div>
        )
    }
}


export default ComplaintList ;