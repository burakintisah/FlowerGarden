import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components'
import Footer from '../../layouts/Footer'
import Navbar from '../../layouts/NavbarSeller'
import { MDBTable, MDBTableBody, MDBTableHead,MDBDataTable  } from 'mdbreact';



class SignUp extends Component {
  
        state = {
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
    



    render() {
        return (
            <div>
            <Navbar />
            <MDBDataTable
                striped
                bordered
                small
                data={this.state.data}
            />

            <Button className="btn-lg btn-dark mt-4 ml-5 " onClick={this.handleSubmit}>arrangement deta</Button>
            <Button className="btn-lg btn-dark mt-4 ml-5 " onClick={this.handleSubmit}>Create</Button>


            <Footer />
            </div>

        )
    }
}


export default SignUp;