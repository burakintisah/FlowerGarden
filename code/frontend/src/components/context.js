import React, { Component } from 'react'
const InfoContext = React.createContext();

// Provider
class InfoProvider extends Component {

    state = {
    }
    render() {
        return (
            <InfoContext.Provider value={{

            }}>
                {this.props.children}
            </InfoContext.Provider>
        )
    }
}

// Consumer
const InfoConsumer = InfoContext.Consumer;

export { InfoProvider, InfoConsumer };