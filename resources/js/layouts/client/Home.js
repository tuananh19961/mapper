import React, {Component} from 'react';
import Header from './../../components/client/Header/Header';
import Footer from './../../components/client/Footer/Footer';
import HomePage from './../../containers/client/HomePage';
import * as constant from './../../constants/Config';
import Login from './../../containers/client/User/Login/Login';
import Modal from 'react-responsive-modal';

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
    }

    render() {
        let {view, open} = this.state;
        return (
            <div className="wrapper">
                <Header changeView={this.onChangView} openLogin = {this.onOpenLogin}/>

                <Modal open={open} onClose={this.onCloseModal} center>
                    <Login onLogin = {this.onHandleLogin}/>
                </Modal>

                <section className="new_arrivals_area section-padding-80 clearfix">
                    <HomePage View={view}/>
                </section>
            </div>
        );
    }
}

export default Home;