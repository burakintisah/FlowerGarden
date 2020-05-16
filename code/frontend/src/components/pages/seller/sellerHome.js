import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import Navbar from '../../layouts/NavbarSeller'
import Footer from '../../layouts/Footer'

class sellerHome extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <h2> Seller Home page...</h2>
                <Footer/>
            </div>
        )
    }
}


export default  sellerHome;