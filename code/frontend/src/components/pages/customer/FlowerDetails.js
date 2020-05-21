import React, { Component} from 'react'
import Navbar from '../../layouts/NavbarCustomer'
import { Redirect } from 'react-router-dom';
import { Button, Row } from 'reactstrap';
import axios from 'axios';
import { Image, Col } from 'react-bootstrap'
import Rating from 'react-rating'
import CommentCard from '../seller/CommentCard';
import DatePicker from 'react-date-picker';
import Select from 'react-select'
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5,
        }}
    />
);

const options = [
    { value: '10', label: '10:00' },
    { value: '11', label: '11:00' },
    { value: '12', label: '12:00' },
    { value: '13', label: '13:00' },
    { value: '14', label: '14:00' },
    { value: '15', label: '15:00' },
    { value: '16', label: '16:00' },
];

class FlowerDetails extends Component {
    state = {
        arrangement_id: null,
        account_id: null,
        district_id: null,
        arrangementName: null,
        volume: null,
        price: null,
        descp: null,
        arrangementRate: null,
        sellerRate: null,
        sellerFirstName: null,
        sellerMiddleName: null,
        sellerLastName: null,
        //enabled: true,
        count: null,
        flowers: [],
        commentArray: [],
        occasions: [],
        redirectToOrderPage: false,
        date: new Date(),
        time: null,
        formattedDate:null,
        formattedTime: null
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ account_id: params.account_id })
        this.setState({ arrangement_id: params.arrangement_id })
        this.setState({ district_id: params.district_id })
        console.log(params.account_id)
        console.log(params.arrangement_id)

        axios.get(window.$globalAddress + '/arrangement/' + params.arrangement_id).then(res => {
            if (res.data.status === 1) {
                this.setState({ arrangementName: res.data.data.arrangement_name })
                this.setState({ descp: res.data.data.details })
                this.setState({ price: res.data.data.price })
                this.setState({ arrangementRate: res.data.data.rate })
                this.setState({ sellerRate: res.data.data.seller.rating })
                this.setState({ sellerFirstName: res.data.data.seller.first_name })
                this.setState({ sellerMiddleName: res.data.data.seller.middle_name })
                this.setState({ sellerLastName: res.data.data.seller.last_name })
                this.setState({ sellerRate: res.data.data.seller.rating })
                this.setState({ volume: res.data.data.volume })
                this.setState({ flowers: res.data.data.flowers })
                this.setState({ commentArray: res.data.data.comments })
                this.setState({ occasions: res.data.data.occasions })
                this.setState({ count: res.data.data.count })
                console.log(res.data)
                console.log(res.data.data.flowers)
                console.log(res.data.data.occasions)
            }

        });
    }

    orderArrangement = event => {
        event.preventDefault();
        this.setState({ redirectToReferrer: true })
    }




    onDateChange = date => { 
        this.setState({ date });
        var str = date.toString();
        var splitted = str.split(" ");
        console.log(str);
        /*console.log(splitted[0]); 
        console.log(splitted[1]); //ay
        console.log(splitted[2]); //gün
        console.log(splitted[3]);  //yıl
*/
        var month = "01";
        switch(splitted[1])
        {
            case "Jan":
                month = "01";
                break;
            case "Feb":
                month = "02";
                break;
            case "Mar":
                month = "03";
                break;
            case "Apr":
                month = "04";
                break;   
            case "May":
                month = "05";
                break;  
            case "Jun":
                month = "06";
                break;
            case "Jul":
                month = "07";
                break;
            case "Aug":
                month = "08";
                break;
            case "Sep":
                month = "09";
                break;
            case "Oct":
                month = "10";
                break;
            case "Nov":
                month = "11";
                break;
            case "Dec":
                month = "12";
                break;       

        }
        //format : yıl-ay-gün
        var parsedDate = splitted[3] + "-" + month + "-" + splitted[2];
        this.setState({ formattedDate : parsedDate });
        console.log(this.state.formattedDate)
        
        
    }
    onTimeChange = time => { 
        this.setState({ time }); console.log(time.label); 
        var timeStr = time.label+ ":00.000000";
        this.setState({formattedTime : timeStr})
        console.log(this.state.formattedTime)
    }


    intersperseOccasions(arr) {
        if (arr.length === 0) {
            return [];
        }
        let occasions = "";
        for (var i = 0; i < arr.length; i++) {
            if (i === arr.length - 1) { occasions = occasions + arr[i].occasion_name }
            else { occasions = occasions + arr[i].occasion_name + ','; }
        }
        //console.log(occasions);
        return occasions;
    }
    intersperseFlowers(arr) {
        if (arr.length === 0) {
            return [];
        }
        let flowers = "";
        for (var i = 0; i < arr.length; i++) {
            if (i === arr.length - 1) {
                flowers = flowers + arr[i].count + " " + arr[i].flower_name
            }
            else {
                flowers = flowers + arr[i].count + " " + arr[i].flower_name + ',';
            }
        }
        //console.log(flowers);
        return flowers;
    }
    render() {

        const { selectedOption } = this.state;
        const redirectToOrderPage = this.state.redirectToReferrer;
        if (redirectToOrderPage === true) {
            return <Redirect to={{
                pathname: '/ordercreation/accountid=' + this.state.account_id + '/districtid=' + this.state.district_id + '/arrangementid=' + this.state.account_id,
                state: {
                    desired_date: this.state.date,
                    desired_time: this.state.time
                }}

            } />
        }
        var sellerName = this.state.sellerFirstName + " " + this.state.sellerMiddleName + " " + this.state.sellerLastName;

        var tags = this.intersperseOccasions(this.state.occasions);
        var flowerNames = this.intersperseFlowers(this.state.flowers);
        let comments = this.state.commentArray.map(comment => {
            return (
                <CommentCard comment={comment} />
            )
        });

        return (
            <div>
                <Navbar account_id={this.state.account_id} district_id= {this.state.district_id}></Navbar>
                <h1 className='ml-5 mt-3'>FlowerGarden</h1>

                <div className="form-row">
                    {/*Column 1 */}
                    <div className="form-group col-md-2 col-sm-2 ml-3" ></div>
                    <div className="form-group col-md-2 col-sm-2 ml-3" >
                        <br /><br />
                        <Col xs={3} md={2}>
                            <Image src={require('../seller/arangement_details.jpg')} rounded="true" />
                        </Col>

                    </div>
                    {/*Column 2 */}
                    <div className="form-group col-md-3 col-sm-3 ml-5">
                        <h1 className=" mt-3" >{this.state.arrangementName}</h1>
                        <Row>
                            <Col>
                                <h2 className="mr-0">${this.state.price}</h2>
                            </Col>
                            <Col>
                                <Rating
                                    readonly="true"
                                    initialRating={this.state.ratingVal}
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    fractions={2}
                                />
                            </Col>
                        </Row>


                        <ColoredLine color="black" />
                        <div className=" mt-3" mt-3>Occasions: {tags}</div>
                        <br /> <h3>Time:</h3>


                        <div className="mr-5">Date: </div>
                        <div>
                            <DatePicker
                                onChange={this.onDateChange}
                                value={this.state.date}
                            />
                        </div>



                        <div className="mr-5">Timeslot: </div>

                        <div>
                            <Select
                                className="selecter"
                                onChange={this.onTimeChange}
                                value={selectedOption}
                                options={options}
                            />
                        </div>

                        <ColoredLine color="black" />
                        <Button variant="dark" size="lg" block onClick={this.orderArrangement}>Order</Button>


                    </div>
                    {/*Column 3 */}
                    <div className="form-group col-md-3 col-sm-3 ml-5">
                        <h2 className='mt-3'>Arrangement Description:</h2>

                        <br />
                        <div>Contained Flowers:  </div>
                        <div> {flowerNames} </div>
                        <br />
                        <div >Volume: {this.state.volume}</div>
                        <br />
                        <div>{this.state.descp}  </div>
                        <h2 className='mt-3'>Seller:</h2>
                        Seller name: {sellerName}
                        <br />
                        <br />
                        <Row>
                            <Col>
                                Average rating:
                            </Col>
                            <Col>
                                <Rating
                                    readonly="true"
                                    initialRating={this.state.sellerRate}
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    fractions={2}
                                />
                            </Col>
                        </Row>

                    </div>
                </div>

                <h2 className='mt-3 ml-5'>Comments</h2>
                {comments}


            </div>
        );
    }
}

export default FlowerDetails;


