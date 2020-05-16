import React, { Component } from 'react'
import Navbar from '../../layouts/NavbarCustomer'
import Footer from '../../layouts/Footer'
import axios from 'axios'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "emre@gmail.com",
            password: "asdads"
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        var data = { email: this.state.id, password: params.id }
        axios.post('http://localhost:5000/login', data).then(res => {
            console.log(res);
            console.log(res.data.data.email);
            // After this we are able to change the state data with the taken information from server
            this.setState({ password: res.data.data.password })
        });
    }

    render() {
        console.log(this.state.password)
        return (
            <div>
                <Navbar />
                <h2> Profile page...</h2>

                <Footer />
            </div>
        )

    }
}

export default Profile;
