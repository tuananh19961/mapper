import React, {Component} from 'react';
import HomeMap from './../../components/client/Map/HomeMap';
import HomeFillter from './../../components/client/Fillter/HomeFillter';
import Preview from './Home/Preview';
import * as constant from './../../constants/Config';
import {Route, Link} from "react-router-dom";

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            width: window.innerWidth,
            marker: []
        };
    }

    // CHECK WIDTH OF SCREEN WHEN RESIZE
    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({width: window.innerWidth});
    };
    // CHECK WIDTH OF SCREEN WHEN RESIZE

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const {width} = this.state;
        const isMobile = width <= 767;

        if (isMobile) {
            const {View} = this.props;
            switch (View) {
                case constant.VIEW_LIST:
                    return (
                        <div className="home_wrapper" id="style-1">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="home_fillter">
                                                <Route path="/" exact component={HomeFillter}/>
                                                <Route path="/view/:id/:slug.html" component= { Preview }/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                case constant.VIEW_MAP:
                    return (
                        <div className="home_wrapper" id="style-1">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="home_map">
                                        <HomeMap/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
            }
        } 
        else 
            return (
                <div className="home_wrapper" id="style-1">
                    <div className="row">

                        <div className="col-sm-7">
                            <div className="home_map">
                                <HomeMap />
                            </div>
                        </div>

                        <div className="col-sm-5">
                            <div className="home_fillter"  id="style-1">
                                        <Route path="/" exact component={ HomeFillter }/>
                                        <Route path="/view/:id/:slug.html" component = { Preview }/>
                            </div>
                        </div>

                    </div>
                </div>
            );
        }
    }

export default HomePage