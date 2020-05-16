import React, { Component } from 'react'
import { InfoConsumer } from '../../context'
import Info from '../../Info'
import Navbar from '../../layouts/NavbarCustomer'
import Footer from '../../layouts/Footer'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account_id: null,
            province_id: null,
            district_id: null,
            day: "mon",
            hour: 12,
            occasions: [{
                "occasion_name": "Anniversary"
            }],
            flowers: [{
                "flower_id": 5
            }]
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(this.state.district_id)
        setInterval(()=>{
            console.log('Updating time...')
            this.setState({ district_id: params.district_id })
        },1)
        this.setState({ account_id: params.account_id })
        this.setState({ province_id: params.province_id })
        this.setState({ district_id: params.district_id })
        console.log(this.state.district_id)
        var data = {
            district_id: this.state.district_id,
            day: this.state.day,
            hour: this.state.hour,
            occasions: this.state.occasions,
            flowers: this.state.flowers
        }
        console.log("This is DATA")
        console.log(data)

        axios.get("http://localhost:5000/arrangement").then(res => {
            //console.log(res.data.data)
            if (res.data.status === 1) {
                this.setState({ provinces: res.data.data })
            }
            else {
                console.log("No Arrangement Found")
            }

        });
    }

    render() {
        return (
            <HomeContainer>
                <Navbar />
                <div className="container">
                    <div className="row mt-5">
                        <div className="card" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h3 className="card-title text-uppercase">{"headerTitle"}</h3>
                                <h5 className="card-title"> {"headerSubTitle"}</h5>
                                <p className="card-text details">{"Some quick example text to build on the card title and make up the bulk of the card's content."}</p>
                                <Link className="btn btn-outline-primary text-uppercase">More Info</Link>
                            </div>
                        </div>


                    </div>
                </div>
                <Footer />
            </HomeContainer>

        )
    }
}

export default Home;

const HomeContainer = styled.div`
.login-form{
    width: 100%;
    max-width: 700px;
    padding: 15px;
    margin: auto;
    height: 100%;
    margin-top:8%;
    margin-bottom:10%
  }
.details {
    font-size: 15px;
}
`;