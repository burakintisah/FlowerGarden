import React, { Component } from 'react'
import { Row } from 'reactstrap';
import { Button,  Input } from 'reactstrap';
import Navbar from '../../layouts/NavbarSeller'
import axios from 'axios';
import Select from 'react-select';


class FlowerStockUpdate extends Component {
  
        state = {
            redirectToReferrerSales: false,
            redirectToReferrerSalePage:false,
            account_id:null,
            flowers: null,
            stock:null,
            flower_id:null
        }

        changeStok = event => { event.preventDefault(); this.setState({ stock: event.target.value }); console.log(this.state.stock)  }

        componentDidMount() {
            const { match: { params } } = this.props;
            this.setState({ account_id: params.account_id })

            axios.get(window.$globalAddress + '/flower').then(res => {
                if (res.data.status === 1) {
                    console.log("The data:", res.data.data)
                    this.setState({ flowers: res.data.data })
                  }
                
            });        
        }

        flowerSelect = flow => {
            console.log(`Option selected:`, flow.label);
            this.setState({ flower_id: flow.value })
        };

        onUpdate = event => {
            event.preventDefault();
            var data = [{ "flower_id": this.state.flower_id,"stock": this.state.stock  }]
            console.log("Sent data:", data)
            axios.post(window.$globalAddress + '/flower/stock/' + this.state.account_id, data).then(res => {
                console.log("RES data:",res)    
                if (res.data.status === 1) {
                    this.setState({ redirectToReferrerSales: true })
                    alert("Stock is updated.")
                }
                else {
                    alert("Stock could not updated, please enter valid numbers.");
                }
    
            });
        };


    render() {

        var display_flowers = []
        if (this.state.flowers != null) {
            display_flowers = this.state.flowers.map(item => {
                const container = {};

                container["value"] = item.flower_id;
                container["label"] = item.flower_name;
                return container;
            })

        }
        
        return (
            <div>
            <Navbar account_id={this.state.account_id}></Navbar>
            <br/>
            <br/>
            <Row>
            <div className="col-md-4 col-sm-4"> </div>
            <div className="col-md-3 col-sm-3"> 
            <h5>Flowers:</h5>
                <Select className= "selecterStock mt-2" onChange={this.flowerSelect}
                    options={display_flowers}
                />  
            <h5 className="mt-5">Enter the flower stock:</h5>
                <Input type="text" placeholder="" onChange={this.changeStok}/>

                <Button className="btn-lg btn-dark mt-5 btn-block "  onClick={this.onUpdate}>Update</Button>
            </div>
            <div className="col-md-4 col-sm-4"> </div>
            </Row>


            
            
                                                                        
            </div>
        )
    }
}


export default FlowerStockUpdate;