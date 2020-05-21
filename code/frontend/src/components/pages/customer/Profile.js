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
                <Navbar account_id={this.state.account_id} district_id= {this.state.district_id}/>
                <h2> Profile page...</h2>

                <Footer />
            </div>
        )

    }
}

export default Profile;
