import React, { Component } from 'react'
import {Button} from 'reactstrap';
import Navbar from '../../layouts/NavbarSeller'
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import {Image, Col} from 'react-bootstrap'
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

const CommentComponent = ({ userName, description, rating  }) => (
    <div className="ml-5 mr-5">
    <br/>
    <ColoredLine color="black" />
    <div>{description}</div>
    <div class="input-group mb-3"  style={{float: 'left'}}>
        <div class="input-group-prepend">
            {userName}
            <Rating readonly="true" className="ml-5"
                initialRating={rating}
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                fractions={2}
            />
        </div>
    </div></div>
);

class ArrangementDetails extends Component {
  
        state = {
           arrangementName: "Roses are rose",
           volume: "25",
           occasions: ['Birthday', "Valentine's Day"],
           flowers: [],
           descp: [],
           ratingVal: "4"
        }

    intersperse(arr) {
            if (arr.length === 0) {
                return [];
            }
            return arr.slice(1).reduce(function(xs, x, i) {
                return xs.concat([',', x]);
            }, [arr[0]]);
    }


    render() {
        var tags = this.intersperse(this.state.occasions);
        var flowerNames = this.intersperse(this.state.flowers);
        return(
            <div>
                <Navbar></Navbar>
                <h1 className='ml-5 mt-3'>FlowerGarden</h1>
                
                {/*Column 1 */}
                <div className="form-row">
                        {/*Column 1 */}
                        <div className="form-group col-md-2 col-sm-2 ml-5" ></div>
                    <div className="form-group col-md-2 col-sm-2 ml-5" >
                        <br /><br />
                        <Col xs={3} md={2}>
                            <Image src={require('./arangement_details.jpg')} rounded="true" />
                        </Col>
                        
                    </div>
                    {/*Column 2 */}
                    <div className="form-group col-md-2 col-sm-2 ml-5">
                        <h1 className=" mt-3" mt-3>{this.state.arrangementName}</h1>                    
                        <Rating readonly="true"
                            initialRating={this.state.ratingVal}
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            fractions={2}
                        />
                        <ColoredLine color="black" />
                        <div className=" mt-3" mt-3>Volume: {this.state.volume}</div>
                        <div className=" mt-3" mt-3>Occasions: {tags}</div>
                        <br /><br /><br /><br />
                        <ColoredLine color="black" />
                        <div class="input-group mb-3" className="mt-4" style={{float: 'right'}}>
                            <div class="input-group-prepend">
                                <Button className="btn-lg btn-dark ml-3 mt-5 "  onClick={this.deleteArrangement}>Delete</Button>
                            </div>
                        </div>

                    </div>
                    {/*Column 3 */}
                    <div className="form-group col-md-2 col-sm-2 ml-5">
                        <h2 className='mt-3'>Arrangement Description:</h2>
                        <br />
                        <div>Contained Flowers: {flowerNames} </div>
                        <div> {this.state.descp} </div>
                    </div>
                </div>
                
                    <h2 className='mt-3 ml-5'>Comments</h2>
                    
                    <CommentComponent userName="esra" description="Very beautiful arrangement!" rating="4.5"/>
                    <CommentComponent userName="nur" description="Love it <3 <3 !" rating="5"/>
                    <CommentComponent userName="deniz" description="It is not that beautiful :(!" rating="2.5"/>
                
            </div>
        );
    }
}


export default ArrangementDetails;

/*
commentleri göstermek için kullan, serverden aldığın datayı functiona verip göster

function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}*/