import React, { Component } from 'react'
import { Button, Input} from 'reactstrap';
import Navbar from '../../layouts/NavbarSeller'
import Footer from '../../layouts/Footer'
import { Redirect} from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios'
import { Multiselect } from 'multiselect-react-dropdown';

var occasionList = [];
//flowers ve occasion ı databaseden al
class CreateArrangement extends Component{
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
    } 
   state = {
            account_id:null,
            name: null,
            price: null,
            volume: null,
            description: null,
            selectedOption1: null,selectedOption2: null,selectedOption3: null,selectedOption4: null,selectedOption5: null,selectedOption6: null,selectedOption7: null,
            count1: null,count2: null,count3: null,count4: null,count5: null,count6: null, count7: null,
            selectedFlowers:[],
            selectedOccasions: [],
            flowers: [],
            totalCount:0,
            occasions: [{'name': 'Anniversary' }, {'name' : 'Congratulations'}, {'name' : 'Just Because'}],
            redirectToReferrer: false
        }
    changeName = event => { event.preventDefault(); this.setState({ name: event.target.value }); console.log(this.state.name); }
    changePrice = event => { event.preventDefault(); this.setState({ price: event.target.value }); console.log(this.state.price); }
    changeVolume = event => { event.preventDefault(); this.setState({ volume: event.target.value }); console.log(this.state.volume); }
    changeDescription = event => { event.preventDefault(); this.setState({ description: event.target.value }); console.log(this.state.description); }

    flowerChange1 = selectedOption1 => {this.setState({ selectedOption1 }); console.log(`Option selected:`, selectedOption1);};
    flowerChange2 = selectedOption2 => {this.setState({ selectedOption2 }); console.log(`Option selected:`, selectedOption2);};
    flowerChange3 = selectedOption3 => {this.setState({ selectedOption3 }); console.log(`Option selected:`, selectedOption3);};
    flowerChange4 = selectedOption4 => {this.setState({ selectedOption4 }); console.log(`Option selected:`, selectedOption4);};
    flowerChange5 = selectedOption5 => {this.setState({ selectedOption5 }); console.log(`Option selected:`, selectedOption5);};  
    flowerChange6 = selectedOption6 => {this.setState({ selectedOption6 }); console.log(`Option selected:`, selectedOption6);};
    flowerChange7 = selectedOption7 => {this.setState({ selectedOption7 }); console.log(`Option selected:`, selectedOption7);};  

    changeCount1 = event => { event.preventDefault(); this.setState({ count1: event.target.value }); console.log(this.state.count1); }
    changeCount2 = event => { event.preventDefault(); this.setState({ count2: event.target.value }); console.log(this.state.count2); }
    changeCount3 = event => { event.preventDefault(); this.setState({ count3: event.target.value }); console.log(this.state.count3); }
    changeCount4 = event => { event.preventDefault(); this.setState({ count4: event.target.value }); console.log(this.state.count4); }
    changeCount5 = event => { event.preventDefault(); this.setState({ count5: event.target.value }); console.log(this.state.count5); }
    changeCount6 = event => { event.preventDefault(); this.setState({ count6: event.target.value }); console.log(this.state.count6); }
    changeCount7 = event => { event.preventDefault(); this.setState({ count7: event.target.value }); console.log(this.state.count7); }
    changeTotal = event => { event.preventDefault(); this.setState({ totalCount: event.target.value }); console.log(this.state.totalCount); }

    onSelect(selectedList, selectedItem) {
        this.state.selectedOccasions.push({"occasion_name": selectedItem.name })
        console.log(this.state.selectedOccasions);
    }

    onRemove(selectedList, selectedItem) {
        //this.state.selectedOccasions.remove({"occasion_name": selectedItem.name })
        console.log(this.state.selectedOccasions);
    }
    


    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ account_id: params.account_id })
        
        axios.get("http://localhost:5000/flower").then(res => {
            console.log(res.data.data)
            if (res.data.status === 1) {
                this.setState({ flowers: res.data.data })
            }
            else {
                console.log("No Flower Found")
            }

        });
    }

    handleSubmit = event => {
        event.preventDefault();
        var flowerList= [];
        if (this.state.selectedOption1 !== null && this.state.count1 !== null) flowerList.push({"flower_id": this.state.selectedOption1.value,"count": Number(this.state.count1) });
        if (this.state.selectedOption2 !== null && this.state.count2 !== null) flowerList.push({"flower_id": this.state.selectedOption2.value,"count": Number(this.state.count2) });
        if (this.state.selectedOption3 !== null && this.state.count3 !== null) flowerList.push({"flower_id": this.state.selectedOption3.value,"count": Number(this.state.count3) });
        if (this.state.selectedOption4 !== null && this.state.count4 !== null) flowerList.push({"flower_id": this.state.selectedOption4.value,"count": Number(this.state.count4) });
        if (this.state.selectedOption5 !== null && this.state.count5 !== null) flowerList.push({"flower_id": this.state.selectedOption5.value,"count": Number(this.state.count5) });
        if (this.state.selectedOption6 !== null && this.state.count6 !== null) flowerList.push({"flower_id": this.state.selectedOption6.value,"count": Number(this.state.count6) });
        if (this.state.selectedOption7 !== null && this.state.count7 !== null) flowerList.push({"flower_id": this.state.selectedOption7.value,"count": Number(this.state.count7) });
        
        var data = {
            rating: null,
            image_path:null,
            seller_id:Number(this.state.account_id), 
            count: Number(this.state.totalCount), 
            arrangement_name: this.state.name, 
            price: Number(this.state.price), 
            volume: Number(this.state.volume),
             details: this.state.description, 
             enabled: 1,
             occasions: this.state.selectedOccasions,
             flowers: flowerList}
             console.log(data);
        axios.post('http://localhost:5000/arrangement/create', data).then(res => { 
            console.log(res); 
            if (res.data.status === 1){
                this.setState({ redirectToReferrer: true})
            }
            else {
                console.log("Could not create the arrangement")
            }
            })
    }
    render () { 

        var displayFlowers = []
        if (this.state.flowers != null) {
            displayFlowers = this.state.flowers.map(item => {
                const container = {};

                container["value"] = item.flower_id;
                container["label"] = item.flower_name;

                return container;
            })

        }

        const { selectedOption } = this.state;

        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return <Redirect push to={`/arrangements/accountid=` + this.state.account_id}/>
        }

        return (
        <div>
            <Navbar></Navbar>
            <h1 className='ml-3 mt-3'>FlowerGarden</h1>
            <div className="container" >
                    <div className="form-row">
                        {/*Column 1 */}
                        <div className="form-group col-md-6 col-sm-6">
                            <div className="mt-4">*Flower Arrangement Name:  </div> <Input type="text" placeholder="" onChange={this.changeName}/>
                             <div className="mt-4">*Price:  </div> <Input type="text" placeholder="" onChange={this.changePrice}/>
                             <div className="mt-4">*Volume:  </div> <Input type="text" placeholder="" onChange={this.changeVolume} />
                             <div className="mt-4">*Description:  </div> <Input type="text" placeholder="" onChange={this.changeDescription}/>
                             <div className="mt-4"> Upload an image</div>

                             <div class="custom-file">
                                <input type="file" class="custom-file-input" id="customFile"/>
                                <label class="custom-file-label" for="customFile">Choose file</label>
                            </div>

                            <div class="input-group mb-3" className="mt-4">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                    <Button className="btn-lg btn-dark" id="deleteImage"> Delete Selected Image </Button>
                                    <Button className="btn-lg btn-dark"  id="uploadImage"> Upload New Photo </Button>
                                    </div>
                                </div>
                            </div>

                            </div>

                        {/*Column 2 */}
                        
                        <div className="form-group col-md-4 col-sm-4 ">
                            <div className="mt-4 ml-5">Flowers: </div>

                                    <Select  
                                        value={selectedOption}
                                        onChange={this.flowerChange1}
                                        options= {displayFlowers}
                                    /> 
                                    <Select  className="mt-2"
                                        value={selectedOption}
                                        onChange={this.flowerChange2}
                                        options= {displayFlowers}
                                    /> 
                                    <Select  className="mt-2"
                                        value={selectedOption}
                                        onChange={this.flowerChange3}
                                        options= {displayFlowers}
                                    /> 
                                    <Select  className="mt-2"
                                        value={selectedOption}
                                        onChange={this.flowerChange4}
                                        options= {displayFlowers}
                                    /> 
                                    <Select  className="mt-2"
                                        value={selectedOption}
                                        onChange={this.flowerChange5}
                                        options= {displayFlowers}
                                    /> 
                                    <Select  className="mt-2"
                                        value={selectedOption}
                                        onChange={this.flowerChange6}
                                        options= {displayFlowers}
                                    /> 
                                    <Select  className="mt-2"
                                        value={selectedOption}
                                        onChange={this.flowerChange7}
                                        options= {displayFlowers}
                                    /> 
                                    <br></br>
                                    Occasions:
                                    <Multiselect 
                                        options={this.state.occasions} // Options to display in the dropdown
                                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                        onSelect={this.onSelect} // Function will trigger on select event
                                        onRemove={this.onRemove} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                    /> 
                                    Total count of the arrangment:  
                                    <div className="mt-2"><input  type="text" className="form-control" placeholder="" onChange={this.changeTotal}/></div>
                                 
                        </div>
                        {/*Column 3 */}
                        <div className="form-group col-md-2 col-sm-8 ">
                            <div className="mt-4 ml-5">Count: </div>
                            <input type="text" className="form-control" placeholder="" onChange={this.changeCount1}/>
                            <div className="mt-2"><input  type="text" className="form-control" placeholder="" onChange={this.changeCount2}/></div>
                            <div className="mt-2"><input  type="text" className="form-control" placeholder="" onChange={this.changeCount3}/></div>
                            <div className="mt-2"><input  type="text" className="form-control" placeholder="" onChange={this.changeCount4}/></div>
                            <div className="mt-2"><input  type="text" className="form-control" placeholder="" onChange={this.changeCount5}/></div>
                            <div className="mt-2"><input  type="text" className="form-control" placeholder="" onChange={this.changeCount6}/></div>
                            <div className="mt-2"><input  type="text" className="form-control" placeholder="" onChange={this.changeCount7}/></div>
                              

                            <Button className="btn-lg btn-dark mt-4 ml-5 " onClick={this.handleSubmit}>Create</Button>

                        </div>
                    </div>
                </div>
                <Footer/>
        </div>  
               
        
        )
    
    }
}

export default CreateArrangement;

  