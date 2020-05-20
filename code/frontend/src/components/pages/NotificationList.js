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
        redirectToReferrer:false,
        account_id: null,
        notification_id: null,
        deletedNotifications:[],
        data : [ ],
        columns: [  {
          name: 'Notification',
          selector: 'description',
        },
        {
          name: 'Date - Time',
          selector: 'timestamp',
          sortable: true,
        },
        ]
    }

    componentDidMount() {
      const { match: { params } } = this.props;
      this.setState({ account_id: params.account_id })
      axios.get('http://localhost:5000/notification/account/'+params.account_id).then(res => {
          if (res.data.status === 1) {
              this.setState({ data: res.data.data })
              console.log(res.data)
            }
            
      });
  }

  onDelete = event => {
    event.preventDefault();
    var nList = [];
    for(var i = 0; i < this.state.deletedNotifications.length; i++)
    {
      nList.push({"notification_id": this.state.deletedNotifications[i].notification_id })
    }
    var data = {notifications: nList };
    console.log("Sent data:", data)
    axios.post('http://localhost:5000/notification/delete', data).then(res => {
      console.log("esraa")
        console.log("RES data:",res)    
        if (res.data.status === 1) {
            this.setState({ redirectToReferrer: true })
            alert("Notifications are deleted.")

            axios.get('http://localhost:5000/notification/account/'+this.state.account_id).then(res => {
              if (res.data.status === 1) {
                  this.setState({ data: res.data.data })
                  console.log(res.data)
                }
                
          });
            
        }
        else {
            alert("Deletion is unsuccessful");
        }

    });
};

    handleChange = (state) => {
      // You can use setState or dispatch with something like Redux so we can use the retrieved data
      console.log('Selected Rows: ', state.selectedRows);
      this.setState({ deletedNotifications: state.selectedRows })
    };

    render() {
     /* if (this.state.redirectToReferrer === true) {
        return <Redirect push to={'/notification-list/accountid=' + this.state.account_id }/>  //homepagelere gönder
    }*/
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