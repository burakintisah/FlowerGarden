import React, { Component } from 'react'
import Navbar from '../../layouts/NavbarCustomerNew'
import Footer from '../../layouts/Footer'
import axios from 'axios'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        console.log(this.state.password)
        return (
            <div>
                <h2> Profile page...</h2>

                <Footer />
            </div>
        )

    }
}


export default Profile;
