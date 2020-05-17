import React, { Component } from 'react'
import {  Container } from 'reactstrap';
import { Button,  Input } from 'reactstrap';
import Navbar from '../../layouts/NavbarSeller'
import { MDBDataTable  } from 'mdbreact';
import { Redirect} from 'react-router-dom';
import axios from 'axios';


//data yı düzenle

class SaleList extends Component {
  
        state = {
            saleID: null,
            redirectToReferrer: false,

             data : {
                columns: [
                    {
                        label: 'ID',
                        field: 'id',
                    },
                    {
                        label: 'Flower Arrangement Name',
                        field: 'name',
                    },
                    {
                        label: 'Sale Date',
                        field: 'saleDate',
                    },
                    {
                        label: 'Delivery Date',
                        field: 'deliveryDate',
                    },
                    {
                        label: 'Delivery Time',
                        field: 'deliveryTime',
                    },
                    {
                        label: 'Courier Name',
                        field: 'courierName',
                    },
                    {
                        label: 'Acceptance Status',
                        field: 'acceptanceStatus',
                    },
                    {
                        label: 'Mesage',
                        field: 'mesage',
                    },
   
                ],
                rows: [
                    {
                        'id': 1,
                        'name': 'Name1',
                        'saleDate': '3',
                        'deliveryDate': '25',
                        'deliveryTime': 'Birthday',
                        'courierName': '3',
                        'acceptanceStatus': '25',
                        'mesage': 'dfsfsdvsv',
                        
                      },
                  { 'id': "202034", 'name': "Daisy Dream", 'saleDate':"17.05.2020", 'deliveryDate': "17.05.2020" , 'deliveryTime': "13.15",  'courierName':"Deniz" , 'acceptanceStatus':"Accepted"}
                  
                ]
              }
        }
        takeFlowerName = event => { event.preventDefault(); this.setState({ saleID: event.target.value });  }
        
        seeFlowerDetails = event => {
            event.preventDefault();
            var data = { arrangement_name: this.state.saleID}
            axios.post('http://localhost:5000/', data).then(res => { 
                console.log(res);   
                if (res.data.status === 1){
                    this.setState({ redirectToReferrer: true})
                }
                else {
                    console.log("There is no such sale ID")
                }
                });
        }

    render() {

       /* const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return <Redirect to={`/`}/>
        }
        detail sayfasına yönlendir
        */

        return (
            <div>
            <Navbar />
            <Container>
            <MDBDataTable
                striped
                bordered
                small
                data={this.state.data}
            />
            <br /> <br />
            <div class="input-group mb-3" className="mt-4" style={{float: 'right'}}>
                <div class="input-group-prepend">
                    <Input className="mr-5" style={{width: '350px'}} type="text" placeholder="Enter the ID of the sale..." onChange={this.changeID} onChange={this.takeFlowerName}/>
                    <Button className="btn-lg btn-dark mr-5 ml-10"  onClick={this.seeSaleDetails}>Sale Details</Button>
                </div>
            </div>
            </Container>
            </div>
        )
    }
}


export default SaleList;