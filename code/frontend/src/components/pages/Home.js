import React, { Component } from 'react'
import { InfoConsumer } from '../context'
import Info from '../Info'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'

class Home extends Component {
    render() {
        return (
            
            <div>
                <Navbar />
                <div className="container">
                    <div className="row mt-5">
                        <InfoConsumer>
                            {value => {
                                return value.info.map(item => {
                                    return <Info key={item.id} item={item}></Info>
                                })
                            }}
                        </InfoConsumer>
                    </div>
                </div>
                <Footer />
            </div>
            
        )
    }
}

export default Home;