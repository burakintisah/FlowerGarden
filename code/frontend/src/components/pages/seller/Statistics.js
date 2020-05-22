import React, { Component } from 'react'
import Navbar from '../../layouts/NavbarSeller'
import axios from 'axios';
import DataTable from 'react-data-table-component';


class Statistics extends Component {

    state = {
        columns: [{
            name: 'District ID',
            selector: 'district_id'
        },
        {
            name: 'First Order',
            selector: 'first_order',
            sortable: true,
        },
        {
            name: 'Number of Orders',
            selector: 'number_of_orders',
            sortable: true,
        },
        {
            name: 'Total Reveneu',
            selector: 'total_revenue',
            sortable: true,
        },
        {
            name: 'Average Revenue',
            selector: 'average_revenue',
            sortable: true,
        },
        {
            name: 'Average Rate',
            selector: 'average_rate',
            sortable: true,
        },
        ],

        data: [],
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ account_id: params.account_id })

        axios.get(window.$globalAddress + '/report/seller/' + params.account_id).then(res => {
            if (res.data.status === 1) {
                console.log("The data:", res.data.data)
                this.setState({ data: res.data.data })
            }

        });
    }


    render() {
        return (
            <div>
                <Navbar account_id={this.state.account_id}></Navbar>
                <br />
                <br />
                <DataTable
                    title="SALES"
                    columns={this.state.columns}
                    data={this.state.data}
                />
            </div>
        )
    }
}


export default Statistics;