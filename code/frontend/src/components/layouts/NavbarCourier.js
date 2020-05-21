import React, { Component } from 'react'
import logo from '../../logo.svg'
import { Link } from 'react-router-dom'


class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render (){
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
        
                    <form className="form-inline ml-auto">
                        <input className="form-control mr-sm-2 ms-5" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-primary my-2 my-sm-0 " type="submit">Search</button>
                    </form>
                    
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to={"/notification-list/accountid=" + this.props.account_id}>Notifications&nbsp;<i class="fas fa-bell"></i></Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link text-white text-uppercase ml-5" to={"/select-district-and-working-hours/courier/accountid="+ this.props.account_id}>Change Service District&nbsp; <i class="fas fa-home"></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to={{pathname:"/profile"}}>My Account&nbsp;<i class="fas fa-user"></i></Link>
                        </li>
                    </ul>
        
                </div>
        
            </nav>
        );
    }

    
}

export default Navbar;