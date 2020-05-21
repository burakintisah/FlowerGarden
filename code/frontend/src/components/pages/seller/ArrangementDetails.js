import React, { Component } from 'react'
import {Button} from 'reactstrap';
import Navbar from '../../layouts/NavbarSeller'
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import {Image, Col} from 'react-bootstrap'
import Rating from 'react-rating'
import CommentCard from './CommentCard';


const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5,
        }}
    />
);

class ArrangementDetails extends Component {
  
            state = {
                arrangement_id: null,
                account_id:null,
                arrangementName: null,
                volume: null,
                price: null,
                occasions: [],
                descp: null,
                ratingVal: null,
                enabled: true,
                count:null,
                flowers: [],
                commentArray: [],
                redirectToReferrer: false

            }


        componentDidMount() {
            const { match: { params } } = this.props;
            this.setState({ account_id: params.account_id })
            this.setState({ arrangement_id: params.arrangement_id })
            console.log(params.account_id )
            console.log(params.arrangement_id)
            axios.get(window.$globalAddress + '/arrangement/'+params.arrangement_id).then(res => {
                if (res.data.status === 1) {
                    this.setState({ arrangementName: res.data.data.arrangement_name })
                    this.setState({ descp: res.data.data.details })
                    this.setState({ enabled: res.data.data.enabled })
                    this.setState({ price: res.data.data.price })
                    this.setState({ ratingVal: res.data.data.rate })
                    this.setState({ volume: res.data.data.volume })
                    this.setState({ flowers: res.data.data.flowers })
                    this.setState({ commentArray: res.data.data.comments })
                    this.setState({ occasions: res.data.data.occasions })
                    this.setState({ count: res.data.data.count })
                    console.log(res.data)
                    console.log(res.data.data.flowers)
                    console.log(res.data.data.occasions )
                }
                  
            });
        }

        

        deleteArrangement = event => {
            event.preventDefault();
            var data = { arrangement_id: this.state.arrangement_id}
            axios.get(window.$globalAddress + '/arrangement/'+  this.state.arrangement_id +'/delete', data).then(res => { 
                console.log(res);   
                if (res.data.status === 1){
                    this.setState({ redirectToReferrer: true})
                }
                else {
                    alert(console.log("The deletion is unsuccesfull"));
                }
                });
        }
 

    intersperseOccasions(arr) {
            if (arr.length === 0 ) {
                return [];
            }
            let occasions = "";
            for(var i = 0; i < arr.length; i++)
            {
                if(i === arr.length -1 ) { occasions = occasions +  arr[i].occasion_name}
                else{ occasions = occasions +  arr[i].occasion_name + ','; }
            }
            //console.log(occasions);
            return occasions;
    }

    intersperseFlowers(arr) {
        if (arr.length === 0 ) {
            return [];
        }
        let flowers = "";
        for(var i = 0; i < arr.length; i++)
        {
            if(i === arr.length -1 )
            {
                flowers = flowers +  arr[i].count + " " + arr[i].flower_name
            }
            else
            {
                flowers = flowers +  arr[i].count + " " + arr[i].flower_name+ ',';
            }
        }
        //console.log(flowers);
        return flowers;
}


    render() {

        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return <Redirect push to={'/arrangements/accountid=' + this.state.account_id}/>
        }

        var tags = this.intersperseOccasions(this.state.occasions);
        var flowerNames = this.intersperseFlowers(this.state.flowers);
        let comments = this.state.commentArray.map(comment => {
            return (
                <CommentCard comment={comment} />
            )
        });


          
        return(
            <div>
                <Navbar account_id={this.state.account_id}></Navbar>
                <h1 className='ml-5 mt-3'>FlowerGarden</h1>
                
                <div className="form-row">
                        {/*Column 1 */}
                        <div className="form-group col-md-2 col-sm-2 ml-3" ></div>
                    <div className="form-group col-md-2 col-sm-2 ml-3" >
                        <br /><br />
                        <Col xs={3} md={2}>
                            <Image src={require('./arangement_details.jpg')} rounded="true" />
                        </Col>
                        
                    </div>
                    {/*Column 2 */}
                    <div className="form-group col-md-3 col-sm-3 ml-5">
                        <h1 className=" mt-3" mt-3>{this.state.arrangementName}</h1>                    
                        
                        <div class="input-group mb-3" style={{float: 'right'}}>
                            <div class="input-group-prepend">
                               <h2 className="mr-5">${this.state.price}</h2>
                                <Rating
                                className="mr-xl-5"
                                    readonly="true"
                                    initialRating={this.state.ratingVal}
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    fractions={2}
                                />
                            </div>
                        </div>
                        <br/>

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
                    <div className="form-group col-md-3 col-sm-3 ml-5">
                        <h2 className='mt-3'>Arrangement Description:</h2>

                        <br />
                        <div>Contained Flowers:  </div>
                        <div> {flowerNames} </div>
                        <br />
                        Stock:
                        <div> {this.state.count} </div>
                        <br />
                        <div>{this.state.descp}  </div>
                    </div>
                </div>
                
                    <h2 className='mt-3 ml-5'>Comments</h2>
                    {comments}
                 
                
            </div>
        );
    }
}



export default ArrangementDetails;

