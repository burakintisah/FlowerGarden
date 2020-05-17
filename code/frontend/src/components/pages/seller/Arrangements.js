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
            account_id: null,
            flowerName: null,
            redirectToReferrerDetails: false,
            redirectToReferrerCreate: false,

             data : {
                columns:  [ {label: '#',field: 'id',},
                           { label: 'Occasions',field: 'occasion',}
                          ],
                rows: [{'id': 1, 'occasion': 'Birthday'}
                      ]
                    }
        }
        componentDidMount() {
          const { match: { params } } = this.props;
          this.setState({ account_id: params.account_id })
          console.log(this.state.account_id)
          axios.get('http://localhost:5000/arrangement/seller/${this.state.account_id}').then(res => {
              //console.log(res.data.data)
              if (res.data.status === 1) {
                  this.setState({ provinces: res.data.data })
              }
              
          });
      }

        takeFlowerName = event => { event.preventDefault(); this.setState({ flowerName: event.target.value }); console.log(this.state.flowerName); }
        
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