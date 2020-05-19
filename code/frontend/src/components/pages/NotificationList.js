import { MDBCard, MDBCardHeader, MDBCardBody, MDBTableEditable } from "mdbreact";
import React, { Component } from 'react'
import { Container } from 'reactstrap';
import { Button, Input } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import DataTable from 'react-data-table-component';



class NotificationList extends Component {

    state = {
        rows: null,
        account_id: null,
        notification_id: null,
        data : [ { id: 1, notification_id: 'Esra the Barbarian'}],
        columns: [  {
          name: 'Notification',
          selector: 'notification_id',
          sortable: true,
        },
        ]
    }
    handleChange = (state) => {
      // You can use setState or dispatch with something like Redux so we can use the retrieved data
      console.log('Selected Rows: ', state.selectedRows);
    };

    render() {
        return (
            <div>
               
                <h1 className='ml-3 mt-3'>FlowerGarden</h1>
                <br />
                <br />
                

                <Container>
                <Image  className= "notificationIcon"src={require('./notification_icon.png')}  />
                <DataTable
                    title="NOTIFICATIONS"
                    columns={this.state.columns}
                    data={this.state.data}
                    selectableRows // add for checkbox selection
                    Clicked
                    onSelectedRowsChange={this.handleChange}
                  />
                    <Button className=" serviceComplaintButtons btn-lg btn-dark mr-5 ml-10"  onClick={this.onDelete}>Delete</Button>

                </Container>

            </div>
        )
    }
}


export default NotificationList;