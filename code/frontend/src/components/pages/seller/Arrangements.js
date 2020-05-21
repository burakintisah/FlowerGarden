import React, { Component } from 'react'
import { Container } from 'reactstrap';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Navbar from '../../layouts/NavbarSeller'


class Arrangements  extends Component {

    state = {
        redirectToReferrerDetails:false,
        redirectToReferrerCreate:false,
        arrangement_id:null,
        account_id: null,
        selectedCount: 0,
        data : [ ],
        columns: [  {
          name: 'ID',
          selector: 'arrangement_id' ,
        },
        {
          name: 'Flower Arrangement Name',
          selector: 'arrangement_name',
          sortable: true,
        },
        {
          name: 'Occasion',
          selector: 'occasion_name',
          sortable: true,
        },
        {
            name: 'Volume',
            selector: 'volume',
            sortable: true,
          },
          {
            name: 'Price',
            selector: 'price',
            sortable: true,
          },

        
        ]
    }

    componentDidMount() {
      const { match: { params } } = this.props;
      this.setState({ account_id: params.account_id })
      axios.get(window.$globalAddress + '/arrangement/seller/' + params.account_id).then(res => {
            if (res.data.status === 1) {

              //res.data.data[0].occasion_name = "esra"
              
             // console.log("Length",res.data.data.length)
              /*for (var i = 0; i <res.data.data.length; i++ )
              {
                var tempOccasion = "";
                for(var j = 0; j < res.data.data[i].occasions.length; j++)
                {
                   tempOccasion = tempOccasion + res.data.data[i].occasions[j].occasion_name + ",";
                }
                 res.data.data[i].occasions = tempOccasion
              }*/

              this.setState({ data: res.data.data })
              console.log(res.data.data)
            }
            
      });
  }

  seeArrangementDetails   = event => {
    event.preventDefault();
    if(this.state.selectedCount !== 1)
    {
        alert("Please select only one sale!")
    }
    else{
        this.setState({redirectToReferrerDetails : true})
    } 

};

    createArrangement = event => {
        event.preventDefault();
        this.setState({ redirectToReferrerCreate: true })
    }

    handleChange = (state) => {
      // You can use setState or dispatch with something like Redux so we can use the retrieved data
      console.log('Selected Rows: ', state.selectedRows);
      if(state.selectedRows.length > 0)
      {
        this.setState({ arrangement_id : state.selectedRows[0].arrangement_id })
        this.setState({ selectedCount: state.selectedRows.length })
        console.log("arrangement_id :", state.selectedRows[0].arrangement_id )
      }

    };

    render() {
        var redirectToReferrer = this.state.redirectToReferrerDetails;
        if (redirectToReferrer === true) {
            return <Redirect push to={'/arrangement-details/accountid=' + this.state.account_id + '/arrangementid=' + this.state.arrangement_id}/> 
        }
        redirectToReferrer = this.state.redirectToReferrerCreate;
        if (redirectToReferrer === true) {
            return <Redirect push to={'/createarrangements/accountid=' + this.state.account_id}/> 
        }
    
        
        return (
            <div>
                <Navbar account_id={this.state.account_id}></Navbar>
                <br />
                <br />
                <Container>
                <DataTable
                    title="ARRANGEMENTS"
                    columns={this.state.columns}
                    data={this.state.data}
                    selectableRows // add for checkbox selection
                    Clicked
                    onSelectedRowsChange={this.handleChange}
                  />
                    <div class="input-group mb-3" className="mt-4" style={{ float: 'right' }}>
                        <div class="input-group-prepend">
                            <Button className="btn-lg btn-dark mr-5 ml-25" onClick={this.seeArrangementDetails}>Arrangement Details</Button>
                            <Button className="btn-lg btn-dark mr-5 ml-10" onClick={this.createArrangement}>Create Arrangement</Button>
                        </div>
                    </div>
                </Container>

            </div>
        )
    }
}


export default Arrangements ;