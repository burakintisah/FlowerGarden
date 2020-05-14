import React from 'react';
import logo from '../../logo.svg'

function Navbar () {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <a className="navbar-brand text-white ml-5 " href="#">FlowerGarden   &nbsp;     
                <img src={logo} alt="logo" style={{width:'35px' }}/>
            </a>
                
                <button className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
                <form className="form-inline ml-auto">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                </form>
                
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link text-white text-uppercase ml-5" href="#">Notifications&nbsp;<i class="fas fa-bell"></i></a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link text-white text-uppercase ml-5" href="#">Change Destination&nbsp; <i class="fas fa-home"></i>
                        <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white text-uppercase ml-5" href="#">Order Tracking&nbsp;<i class="fas fa-truck-moving"></i></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white text-uppercase ml-5" href="#">My Account&nbsp;<i class="fas fa-user"></i></a>
                    </li>
                </ul>
    
            </div>
    
        </nav>
    );
}

export default Navbar;