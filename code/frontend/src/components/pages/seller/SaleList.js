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
            account_id:null,
            r: [],
            headings:  [
                {label: 'ID',field: 'arrangement_id'},
                {label: 'Flower Arrangement Name',field: 'arrangement_name'},
                {label: 'Sale Date',field: ''},
                {label: 'Deliery Date',field: ''},
                {label: 'Delivery Time',field: ''},
                {label: 'Courier Name',field: ''},
                {label: 'Acceptance Status',field: ''},
                {label: 'Message',field: ''}

            ],
            data : []
        }

        componentDidMount() {
            const { match: { params } } = this.props;
            this.setState({ account_id: params.account_id })
            axios.get('http://localhost:5000/order/seller/'+params.account_id).then(res => {
                if (res.data.status === 1) {
                    this.setState({ r: res.data.data })
                    console.log(res.data.data[0])
                  }
                  
            });
        }

        takeSaleID = event => { event.preventDefault(); this.setState({ saleID: event.target.value });  }
        
        seeSaleDetails = event => {
            event.preventDefault();
            this.setState({ redirectToReferrer: true})
        }

    render() {

        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            //return <Redirect push to={'/sale-details/accountid=' + this.state.account_id + 'saleid=' + this.state.saleID}/>  buraya baaaaaaaaaaaaaak
        }
       
       this.state.data = {
        columns: this.state.headings,
        rows: this.state.r
      };

        return (
            <div>
            <Navbar />
            <h1 className='ml-3 mt-3'>FlowerGarden</h1>
            <br/>
            <br/>
            <Container>
            <h2>Sale Details</h2>
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