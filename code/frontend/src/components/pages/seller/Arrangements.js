import React, { Component } from 'react'
import {  Container } from 'reactstrap';
import { Button,  Input } from 'reactstrap';
import Navbar from '../../layouts/NavbarSeller'
import { MDBDataTable  } from 'mdbreact';
import { Redirect} from 'react-router-dom';
import axios from 'axios';


//data yı düzenle

class SignUp extends Component {
  
        state = {
            flowerName: null,
            redirectToReferrerDetails: false,
            redirectToReferrerCreate: false,

             data : {
                columns: [
                  {
                    label: '#',
                    field: 'id',
                  },
                  {
                    label: 'Flower Arrangement Name',
                    field: 'name',
                  },
                  {
                    label: 'Volume',
                    field: 'volume',
                  },
                  {
                    label: 'Price',
                    field: 'price',
                    },
                {
                    label: 'Occasions',
                    field: 'occasion',
                }
                ],
                rows: [
                  {
                    'id': 1,
                    'name': 'Name1',
                    'volume': '3',
                    'price': '25',
                    'occasion': 'Birthday'
                  },
                  {
                    'id': 2,
                    'name': 'Name2',
                    'volume': '4',
                    'price': '40',
                    'occasion': 'Birthday'
                  },
                  {
                    'id': 3,
                    'name': 'Name3',
                    'volume': '5',
                    'price': '30',
                    'occasion': 'Birthday'
                  },
                  {
                    'id': 4,
                    'name': 'Name4',
                    'volume': '1',
                    'price': '55',
                    'occasion': 'Birthday'
                  },
                  {
                    'id': 5,
                    'name': 'Name5',
                    'volume': '5',
                    'price': '20',
                    'occasion': 'Birthday'
                  },
                  {
                    'id': 6,
                    'name': 'Name6',
                    'volume': '6',
                    'price': '75',
                    'occasion': 'Birthday'
                  }
                ]
              }
        }
        takeFlowerName = event => { event.preventDefault(); this.setState({ flowerName: event.target.value }); console.log(this.state.flowerName); }
        
        seeFlowerDetails = event => {
            event.preventDefault();
            var data = { arrangement_name: this.state.flowerName}
            axios.post('http://localhost:5000/login', data).then(res => { 
                console.log(res);   
                if (res.data.status === 1){
                    this.setState({ redirectToReferrerDetails: true})
                }
                else {
                    console.log("There is no such flower arrangement")
                }
                });
        }

        createArrangement = event => {
            event.preventDefault();
            this.setState({ redirectToReferrerCreate: true})
        }

    render() {

        const redirectToReferrer1 = this.state.redirectToReferrerCreate;
        if (redirectToReferrer1 === true) {
            return <Redirect to={`/createarrangements`}/>
        }
        const redirectToReferrer2 = this.state.redirectToReferrerDetails;
        if (redirectToReferrer2 === true) {
            return <Redirect to={`/arrangement-details`}/>
        }

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
                    <Input className="mr-5" style={{width: '350px'}} type="text" placeholder="Enter the name of the arrangement..."  onChange={this.takeFlowerName}/>
                    <Button className="btn-lg btn-dark mr-5 ml-25"  onClick={this.seeFlowerDetails}>Arrangement Details</Button>
                    <Button className="btn-lg btn-dark mr-5 ml-10"  onClick={this.createArrangement}>Create Arrangement</Button>
                </div>
            </div>
            </Container>
            </div>
        )
    }
}


export default SignUp;