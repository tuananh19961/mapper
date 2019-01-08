import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import Login from './Login/Login';
import classnames from 'classnames';
import Register from './Register/Register';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '2'
        };
    }
    
    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }
    
    onCloseLogin = () => {
            this.props.onLogin();    
    }

    render() {
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({
                            active: this.state.activeTab === '1'
                        })}
                            onClick={() => {
                            this.toggle('1');
                        }}>
                            Đăng nhập
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                            active: this.state.activeTab === '2'
                        })}
                            onClick={() => {
                            this.toggle('2');
                        }}>
                            Đăng ký
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                       <Login onCloseLogin = {this.onCloseLogin}/>
                    </TabPane>
                    <TabPane tabId="2">
                        <Register onCloseLogin = {this.onCloseLogin} />
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default User;