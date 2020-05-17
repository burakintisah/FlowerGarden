import React, { Component } from 'react'
import Navbar from '../../layouts/NavbarCustomer'
import Footer from '../../layouts/Footer'
import { Redirect } from 'react-router-dom';

class FlowerDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account_id: null,
            district_id: null,
            arrangement_id: null,
            redirectToOrderPage: false
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({
            account_id: params.account_id,
            arrangement_id: params.arrangement_id,
            district_id: params.district_id
        })

    }

    render() {

        const redirectToOrderPage = this.state.redirectToReferrer;
        //customer
        if (redirectToOrderPage === true) {
            return <Redirect to={`/order-creation/accountid=${this.props.account_id}`} />
        };
        return (
            <div>
                <Navbar />
                <h2> Flower Details page...</h2>
                <Footer />
            </div>
        )
    }
}

export default FlowerDetails;