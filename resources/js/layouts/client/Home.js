import React, { Component } from 'react';
import Header from './../../components/client/Header/Header';
import Footer from './../../components/client/Footer/Footer';
import HomePage from './../../containers/client/HomePage';
import * as constant from './../../constants/Config';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: constant.VIEW_LIST
        }
    }
    
    onChangView = (data) => {
        if(data){
            this.setState({
                view: data
            })
        }
    }

    render() {
        let {view} = this.state;
        return (
            <div className="wrapper">
                <Header changeView={this.onChangView}/>
                <section className="new_arrivals_area section-padding-80 clearfix">
                    <HomePage View={view}/>
                </section>
               
            </div>
        );
    }
}

export default Home;