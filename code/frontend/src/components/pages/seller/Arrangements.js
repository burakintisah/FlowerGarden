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
            rows:null,
            account_id: null,
            flowerID: null,
            redirectToReferrerDetails: false,
            redirectToReferrerCreate: false,
            r:[],
            c:  [
                    {label: 'ID',field: 'arrangement_id'},
                    {label: 'Flower Arrangement Name',field: 'arrangement_name'},
                    {label: 'Volume',field: 'volume'},
                    {label: 'Price',field: 'price'},
                    {label: 'Occasions',field: 'occasion_name'},
                    {label: 'Count', field: 'count'}

                ],
             data : []
        }
        componentDidMount() {
          const { match: { params } } = this.props;
          this.setState({ account_id: params.account_id })
          axios.get('http://localhost:5000/arrangement/seller/'+params.account_id).then(res => {
              if (res.data.status === 1) {
                  this.setState({ r: res.data.data })
                  console.log(res.data.data[0])
                }
                
          });
      }

        takeFlowerID = event => { event.preventDefault(); this.setState({ flowerID: event.target.value }); console.log(this.state.flowerID); }
        
        seeFlowerDetails = event => {
            event.preventDefault();
            var data = { arrangement_name: this.state.flowerName}
            axios.post('http://localhost:5000/arrangement/{flowerName}', data).then(res => { 
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
        this.state.data = {
            columns: this.state.c,
            rows: this.state.r
          };
        const redirectToReferrer1 = this.state.redirectToReferrerCreate;
        if (redirectToReferrer1 === true) {
            return <Redirect to={`/createarrangements/accountid=` + this.state.account_id}/>
        }
        const redirectToReferrer2 = this.state.redirectToReferrerDetails;
        if (redirectToReferrer2 === true) {
            return <Redirect to={'/arrangement-details/accountid=' + this.state.account_id +'/arrangementid=' +this.state.flowerID}/>
        }
        return (
            <div>
            <Navbar />
            <h1 className='ml-3 mt-3'>FlowerGarden</h1>
            <br/>
            <br/>
            <Container>
            <h2>Arrangement Details</h2>
            <MDBDataTable
                striped
                bordered
                small
                data={this.state.data}
            />
            <br /> <br />
            <div class="input-group mb-3" className="mt-4" style={{float: 'right'}}>
                <div class="input-group-prepend">
                    <Input className="mr-5" style={{width: '350px'}} type="text" placeholder="Enter the ID of the arrangement..."  onChange={this.takeFlowerID}/>
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