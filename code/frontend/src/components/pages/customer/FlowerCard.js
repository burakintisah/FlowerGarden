import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';

class FlowerCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="mt-5">
                <Card>
                    <CardImg top width="100%" src="" alt="ImageName" />
                    <CardBody>
                        <CardTitle>{this.props.flower.arrangement_name}</CardTitle>
                        <CardSubtitle>Name{this.props.flower.arrangement_name}</CardSubtitle>
                        <CardText>{this.props.flower.details}</CardText>
                        <Button>Details</Button>
                    </CardBody>
                </Card>
            </div>

        )
    }
}
export default FlowerCard;