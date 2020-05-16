import React, { Component } from 'react'
import Navbar from '../../layouts/NavbarCustomer'
import Footer from '../../layouts/Footer'
import axios from 'axios'

class selectDistrict extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                    This is Select District Page
                <Footer/>
            </div>
        )
    }
}

export default selectDistrict;