import React, {Component} from 'react';
import Header from './../../components/client/Header/Header';
import HomePage from './../../containers/client/HomePage';
import * as constant from './../../constants/Config';
import Modal from 'react-responsive-modal';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import User from './../../containers/client/User/User';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: constant.VIEW_LIST,
            open: false
        }
    }

    onChangView = (data) => {
        if (data) {
            this.setState({view: data})
        }
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };
    
    onOpenLogin = () => {
        this.setState({ open: true });
    }

    onHandleLogin = () => {
            this.setState({ open: false });
            NotificationManager.success('', 'Đăng nhập thành công!', 2000);      
    }

    render() {
        let {view, open} = this.state;
        return (
            <div className="wrapper">
                <NotificationContainer />
                <Header changeView={this.onChangView} openLogin = {this.onOpenLogin}/>

                <Modal open={open} onClose={this.onCloseModal} center>
                    <User onLogin = {this.onHandleLogin} />
                </Modal>

                <section className="new_arrivals_area section-padding-80 clearfix">
                    <HomePage View={view}/>
                </section>
            </div>
        );
    }
}

export default Home;