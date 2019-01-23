import React, {Component} from 'react';
import Header from './../../components/client/Header/Header';
import HomePage from './../../containers/client/HomePage';
import * as constant from './../../constants/Config';
import Modal from 'react-responsive-modal';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import User from './../../containers/client/User/User';
import Create from './../../containers/client/Motel/Create/Create';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: constant.VIEW_LIST,
            open: false,
            open_create: false
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


    // CREATE NEW MOTEL
    onCloseModalCreate = () => {
        this.setState({
            open_create: false
        })
    }

    onOpenCreate = () => {
        this.setState({
            open_create: true
        })
    }

    
    render() {
        let {view, open, open_create} = this.state;
        return (
            <div className="wrapper">
                <NotificationContainer />
                <Header changeView={this.onChangView} openLogin = {this.onOpenLogin} openCreate = {this.onOpenCreate}/>

                <Modal open={open} onClose={this.onCloseModal} center>
                    <User onLogin = {this.onHandleLogin} />
                </Modal>

                <Modal open={open_create} onClose={this.onCloseModalCreate} center>
                    <Create />
                </Modal>

                <section className="new_arrivals_area section-padding-80 clearfix">
                    <HomePage View={view}/>
                </section>
            </div>
        );
    }
}

export default Home;