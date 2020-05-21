import React, { Component } from 'react'
import logo from '../../logo.svg'
import { Link } from 'react-router-dom'


class Navbar extends Component  {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render () {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <Link className="navbar-brand text-white ml-5 " to="/" >FlowerGarden   &nbsp;     
                    <img src={logo} alt="logo" style={{width:'35px' }}/>
                </Link>
                    
                    <button className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span >
                            <i className = "fas fa-bars" style= {{color: '#fff'}}/>
                        </span>
                    </button>
    
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
        
                    
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to={"/notification-list/seller/accountid=" + this.props.account_id}>Notifications&nbsp;<i class="fas fa-bell"></i></Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link text-white text-uppercase ml-5" to={"/select-district-working-hours/seller/accountid=" + this.props.account_id}>Change District/Hours&nbsp; <i class="fas fa-home"></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to={"/sale-list/seller/accountid=" + this.props.account_id}>Sales&nbsp;<i class="fas fa-handshake"></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to={"/arrangements/accountid=" + this.props.account_id}>Arrangements&nbsp;<i class="fab fa-pagelines"></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to={"/stock-update/seller/accountid=" + this.props.account_id} >Stock Update&nbsp;<i class="fas fa-user"></i></Link>
                        </li>
                    </ul>
        
                </div>
        
            </nav>
        );

    }
    
}

export default Navbar;