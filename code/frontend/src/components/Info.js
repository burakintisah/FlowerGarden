import React, { Component } from 'react'
import { InfoConsumer } from './context'
import { Link } from 'react-router-dom'


class Info extends Component {
    render() {

        const {
            id,
            headerSubTitle = "subtitle",
            headerTitle = "Title",
            img = "",
            cardText = "Sint fugiat officia sit aliqua velit.",
        } = this.props.item;

        return (
            <InfoConsumer>
                {value => ( 
                    <div className='col-10 col-lg-4 mx-auto mb-5'>
                        <div className="card" style={{ width: '18rem' }}>
                            <img src={img} alt={headerTitle} className="card-image-top"/>
                            <div className="card-body">
                                <h3 className="card-title text-uppercase">{headerTitle}</h3>
                                <h5 className="card-title"> {headerSubTitle}</h5>
                                <p class="card-text">{cardText}</p>
                                <Link class="btn btn-outline-primary text-uppercase">More Info</Link>
                            </div>
                        </div>
                    </div>
                )}
            </InfoConsumer>
        )
    }
}
export default Info;