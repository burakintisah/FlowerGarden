import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import Rating from 'react-rating'
import { Redirect } from 'react-router-dom';

class FlowerCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        //directing to the home page...
        this.setState({ redirectToReferrer: true })
        console.log("BUTTON CLICKED")
    }

    render() {

        const redirectToReferrer = this.state.redirectToReferrer;
        //customer
        if (redirectToReferrer === true) {
            return <Redirect to={`/flowerdetails/accountid=${this.props.account_id}/arrangementid=${this.props.flower.arrangement_id}`} />
        };

        return (
            
            <div className="mt-5">
                <Card >
                    <CardImg top width="100%" src="https://www.thespruce.com/thmb/3lsEN6GZna9lSnFiFS3aJl2u0Ts=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/Floom_Shus_DDG_0382_copy-5af06f0d8e1b6e0039e6e7c7.jpg" alt="ImageName" />
                    <CardBody>
                        <CardTitle className="text-uppercase font-weight-bolder">{this.props.flower.arrangement_name}</CardTitle>
                        <CardSubtitle>Seller: {this.props.flower.first_name}  {this.props.flower.last_name}</CardSubtitle>
                        <CardSubtitle>{this.props.flower.details}</CardSubtitle>
                        <br></br>
                        <div>
                            <Rating readonly="true"
                                initialRating={this.props.flower.rate}
                                emptySymbol="fa fa-star-o fa-2x"
                                fullSymbol="fa fa-star fa-2x"
                                fractions={2} />
                            <br></br><br></br>
                            <CardSubtitle className=" font-weight-bolder">Price: {this.props.flower.price}</CardSubtitle>
                        </div>

                        <br></br>
                        <Button onClick={this.handleSubmit}>Details</Button>
                    </CardBody>
                </Card>
            </div>

        )
    }
}
export default FlowerCard;