import React, { Component } from 'react'
import { placeInfo } from '../data'
const InfoContext = React.createContext();

// Provider
class InfoProvider extends Component {

    state = {
        info: placeInfo,
    }
    render() {
        return (
            <InfoContext.Provider value={{
                info: this.state.info,
            }}>
                {this.props.children}
            </InfoContext.Provider>
        )
    }
}

// Consumer
const InfoConsumer = InfoContext.Consumer;

export { InfoProvider, InfoConsumer };