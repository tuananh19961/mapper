import React, { Component } from 'react';
import * as constant from './../../../constants/Config';

class Header extends Component {

    // SEND VIEW CONFIG FOR LAYOUT
    onChangeView = (data) => {
        if(data){
            this.props.changeView(data);
        }  
    }

    render() {
        return (
            <header className="header_area">
            <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
               
                <nav className="classy-navbar" id="essenceNav">
               
                    <a className="nav-brand" href="index.html"><img src="/client/img/core-img/motel.png" alt=""/></a>
                
                    <div className="classy-navbar-toggler">
                        <span className="navbarToggler"><span></span><span></span><span></span></span>
                    </div>
                
                    <div className="classy-menu">
                      
                        <div className="classycloseIcon">
                            <div className="cross-wrap"><span className="top"></span><span className="bottom"></span></div>
                        </div>
                        
                        <div className="classynav">
                            <ul>
                                
                            </ul>
                        </div>

                    </div>
                </nav>
    
               
                <div className="header-meta d-flex clearfix justify-content-end">
                   
                    <div className="search-area">
                        <form action="#" method="post">
                            <input type="search" name="search" id="headerSearch" placeholder="Type for search" />
                            <button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                        </form>
                    </div>
                  
                    <div className="favourite-area">
                        <a href="#"><img src="/client/img/core-img/heart.svg" alt="" /></a>
                    </div>
               
                    <div className="user-login-info">
                        <a href="#" onClick = {() => this.props.openLogin()}><img src="/client/img/core-img/user.svg" alt="" /></a>
                    </div>
                    <div className="favourite-area app-responsive">
                        <a href="#" onClick={() => this.onChangeView(constant.VIEW_LIST)}><img src="/client/img/core-img/lnr-list.svg" alt="" /></a>
                    </div>
                    <div className="favourite-area app-responsive">
                        <a href="#" onClick={() => this.onChangeView(constant.VIEW_MAP)}><img src="/client/img/core-img/lnr-map.svg" alt="" /></a>
                    </div>
                </div>
    
            </div>
        </header>
        );
    }
}

export default Header;