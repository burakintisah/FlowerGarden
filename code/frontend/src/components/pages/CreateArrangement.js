import React from 'react'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { MDBFileInput } from "mdbreact";
function CreateArrangement() {
    return (
        <div>
            <h1 className='ml-1'>FlowerGarden</h1>
            <div className="container" background-color="#ffffff73" >
                    <div className="row">
                        {/*Column 1 */}
                        <div className="col-md-6 col-sm-6">
                            *Flower Arrangement Name:  <Input type="text" placeholder="" />
                             *Price:  <Input type="text" placeholder="" />
                             *Volume:  <Input type="text" placeholder="" />
                             *Description:  <Input type="text" placeholder="" />

                             <div class="text-center">
                                <img url="../background4.jpg" class="rounded" alt=".img-thumbnail"/>
                            </div>


                            
                             Upload an image
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <Input type="text" placeholder="" />
                                        <button class="btn btn-outline-secondary"  type="button" id="browse"> Browse... </button>
                                    </div>
                                </div>
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                    <button class="btn btn-outline-secondary" type="button" id="seleteImage"> Delete Selected Image </button>
                                    <button class="btn btn-outline-secondary" type="button" id="uploadImage"> Upload New Photo </button>
                                    </div>
                                </div>
                            </div>

                            </div>

                        {/*Column 2 */}
                        <div className="col-md-6 col-sm-6">
                            Middle Name  <Input type="text" placeholder="" />
                            *Phone  <Input type="text" placeholder="" />
                            
                            <div >*IBAN</div>
                            <Input type="text" placeholder=""   />

                            <div >*Address</div>
                            <Input type="text" placeholder=""    />

                            <br></br>
                            <div class="input-group mb-3" >
                                <select class="custom-select" id="province" >
                                    <option selected>Select a province</option>
                                    <option value="1">Ankara</option>
                                    <option value="2">İstanbul</option>
                                    <option value="3">Eskişehir</option>
                                </select>
                                <select class="custom-select" id="district">
                                    <option selected>Select a distric</option>
                                    <option value="1">Çankaya</option>
                                    <option value="2">Beytepe</option>
                                    <option value="3">100. Yıl</option>
                                </select>
                            </div>

                          
                                Please select the desired account type:



                        </div>
                    </div>
                </div>
        </div>
                
        
    )
}

export default CreateArrangement;

/*import { MDBIcon, MDBBtn } from "mdbreact";
<MDBIcon icon="angle-down" />
<MDBIcon icon="angle-up" />*/