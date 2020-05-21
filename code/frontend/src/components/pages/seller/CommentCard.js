import React, { Component } from 'react'
import Rating from 'react-rating'
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5,
        }}
    />
);
class CommentCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="ml-5 mr-5">
            <br/>
            <ColoredLine color="black" />
            <div>{this.props.comment.description}</div>
            <div class="input-group mb-3"  style={{float: 'left'}}>
                <div class="input-group-prepend">
                    {this.props.comment.date}
                    <Rating readonly="true" className="ml-5"
                        initialRating={this.props.comment.rating}
                        emptySymbol="fa fa-star-o fa-2x"
                        fullSymbol="fa fa-star fa-2x"
                        fractions={2}
                    />
                </div>
            </div></div>
        )
    }
}
export default CommentCard;


