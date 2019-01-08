import React, { Component } from 'react';
import * as constant from './../../../constants/Config';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { UserAction } from './../../../actions/index';
import {NotificationManager} from 'react-notifications';


class Header extends Component {
    
    componentWillMount(){
        const token = localStorage.getItem('access_token');
        if(token){
            this.props.getUserInLocal(token);
        }
    }

    // SEND VIEW CONFIG FOR LAYOUT
    onChangeView = (data) => {
        if(data){
            this.props.changeView(data);
        }  
    }

    render() {
        const {User} = this.props;
        const token = localStorage.getItem('access_token');
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
                        <a href="#"><img src="/client/img/core-img/lnr-heart.svg" alt="" /></a>
                    </div>
               
                    <div className="user-login-info">
                        {
                            isEmpty(User.data)
                            ? <a href="#" onClick = {() => this.props.openLogin()}>
                                    <img src="/client/img/core-img/lnr-enter.svg" alt="" />
                              </a>
                            : <a href="#"><img src="/client/img/core-img/avatar_default.png" alt="" className="user_avatar"/></a>
                        }
                    </div>

                    {
                         isEmpty(User.data) 
                         ? ''
                         : <div className="user-login-info">
                                <a href="" onClick = {(e) => {
                                    e.preventDefault();
                                    this.props.userLogout(token).then( (res) => NotificationManager.success('', 'Đăng xuất thành công!', 1500));
                                }}>
                                    <img src="/client/img/core-img/lnr-exit.svg" alt="Đăng xuất" />
                                </a>  
                           </div>
                    }

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

const mapStateToProps = (state) => {
    return {
        User: state.User
    }
}

const mapDispatchToProps = (dispatch,props) => {
    return {
        getUserInLocal:(token) =>  dispatch(UserAction.getUserLocal(token)),
        userLogout: (t) => dispatch(UserAction.userLogoutRequest(t))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);