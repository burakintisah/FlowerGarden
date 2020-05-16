import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import Navbar from '../../layouts/NavbarSeller'
import Footer from '../../layouts/Footer'

import Select from 'react-select';
import axios from 'axios'
import { Multiselect } from 'multiselect-react-dropdown';

var occasionList = [];
class CreateArrangement extends Component{
    
   state = {
            name: null,
            price: null,
            volume: null,
            description: null,
            selectedOption1: null,
            selectedOption2: null,
            selectedOption3: null,
            selectedOption4: null,
            selectedOption5: null,
            selectedOption6: null,
            selectedOption7: null,
            count1: null,
            count2: null,
            count3: null,
            count4: null,
            count5: null,
            count6: null,
            count7: null,
            occasions: [{name: 'birthday'},{name: 'valantines day'}]
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

    onSelect(selectedList, selectedItem) {
        console.log(occasionList);
        occasionList.push(selectedItem)
    }

    onRemove(selectedList, selectedItem) {
        console.log(selectedItem);
        occasionList.remove(selectedItem)
    }
    handleSubmit = event => {
        event.preventDefault();
        var data = { arrangement_name: this.state.name, price: this.state.price, volume: this.state.volume, details: this.state.description, enabled: "true",occasionList }
        axios.post('http://localhost:5000/create-arrangement', data).then(res => { 
            console.log(res); 
            console.log(res.data.data.arrangement_name)
            })
    }


    render () { 
        const { selectedOption } = this.state;
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
                                        options= {[{ value: 'primrose', label: 'primrose'},{ value: 'gillyflower', label: 'gillyflower'},{ value: 'magnolia', label: 'magnolia'},{ value: 'lily', label: 'lily'}]}
                                    /> 
                                    <Select  className="mt-2"
                                        value={selectedOption}
                                        onChange={this.flowerChange2}
                                        options= {[{ value: 'primrose', label: 'primrose'},{ value: 'gillyflower', label: 'gillyflower'},{ value: 'magnolia', label: 'magnolia'},{ value: 'lily', label: 'lily'}]}
                                    /> 
                                    <Select  className="mt-2"
                                        value={selectedOption}
                                        onChange={this.flowerChange3}
                                        options= {[{ value: 'primrose', label: 'primrose'},{ value: 'gillyflower', label: 'gillyflower'},{ value: 'magnolia', label: 'magnolia'},{ value: 'lily', label: 'lily'}]}
                                    /> 
                                    <Select  className="mt-2"
                                        value={selectedOption}
                                        onChange={this.flowerChange4}
                                        options= {[{ value: 'primrose', label: 'primrose'},{ value: 'gillyflower', label: 'gillyflower'},{ value: 'magnolia', label: 'magnolia'},{ value: 'lily', label: 'lily'}]}
                                    /> 
                                    <Select  className="mt-2"
                                        value={selectedOption}
                                        onChange={this.flowerChange5}
                                        options= {[{ value: 'primrose', label: 'primrose'},{ value: 'gillyflower', label: 'gillyflower'},{ value: 'magnolia', label: 'magnolia'},{ value: 'lily', label: 'lily'}]}
                                    /> 
                                    <Select  className="mt-2"
                                        value={selectedOption}
                                        onChange={this.flowerChange6}
                                        options= {[{ value: 'primrose', label: 'primrose'},{ value: 'gillyflower', label: 'gillyflower'},{ value: 'magnolia', label: 'magnolia'},{ value: 'lily', label: 'lily'}]}
                                    /> 
                                    <Select  className="mt-2"
                                        value={selectedOption}
                                        onChange={this.flowerChange7}
                                        options= {[{ value: 'primrose', label: 'primrose'},{ value: 'gillyflower', label: 'gillyflower'},{ value: 'magnolia', label: 'magnolia'},{ value: 'lily', label: 'lily'}]}
                                    /> 
                                    <br></br>
                                    <Multiselect 
                                        options={this.state.occasions} // Options to display in the dropdown
                                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                        onSelect={this.onSelect} // Function will trigger on select event
                                        onRemove={this.onRemove} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                    />                                    
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
