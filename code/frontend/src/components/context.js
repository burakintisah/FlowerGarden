import React, { Component } from 'react'
import { placeInfo, reviews, detailInfo, news } from '../data'
const InfoContext = React.createContext();

// Provider
class InfoProvider extends Component {

    state = {
        info: placeInfo,
        reviews: reviews,
        detailInfo: detailInfo,
        new: news,
    }
    render() {
        return (
            <InfoContext.Provider value={{
                info: this.state.info,
                reviews: this.state.reviews,
                detailInfo: this.detailInfo,
                news: this.state.news,
            }}>
                {this.props.children}
            </InfoContext.Provider>
        )
    }
}

// Consumer
const InfoConsumer = InfoContext.Consumer;

export { InfoProvider, InfoConsumer };