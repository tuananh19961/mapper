import React, {Component} from 'react';
import HomeMap from './../../components/client/Map/HomeMap';
import HomeFillter from './../../components/client/Fillter/HomeFillter';
import Preview from './Home/Preview';
import * as constant from './../../constants/Config';
import {connect} from 'react-redux';
import {ProvinceAction, DistrictAction, MotelAction} from './../../actions/index';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

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
        this
            .props
            .getProvince();
        this
            .props
            .getMotel();
    }

    onChangeProvince = (data) => {
        if (data) {
            this
                .props
                .getDistrict(data);
            this
                .props
                .getProvinceSelected(data);
        }
    }

    onChangeDistrict = (data) => {
        if (data) {
            this
                .props
                .getDistrictSelected(data)
        }
    }

    onItemSelected = (data) => {
        if (data) {
            this
                .props
                .getItemMotel(data)
        }
    }

    render() {
        const {width} = this.state;
        const isMobile = width <= 767;
        let {Province, District, Motel} = this.props;

        if (isMobile) {
            const {View} = this.props;
            switch (View) {
                case constant.VIEW_LIST:
                    return (
                        <div className="home_wrapper" id="style-1">
                            <div className="row">

                                <div className="col-sm-12">
                                    <div className="home_fillter">
                                        <Router>
                                            <Switch>
                                                <Route
                                                    path="/"
                                                    exact
                                                    component={(props) => <HomeFillter
                                                    {...props}
                                                    Province={Province}
                                                    onProvince={this.onChangeProvince}
                                                    onDistrict={this.onChangeDistrict}
                                                    District={District}
                                                    Motel={Motel}
                                                    selected={{
                                                    province: Province.selected,
                                                    district: District.selected
                                                }}/>}/>
                                                <Route
                                                    path="/view/:id/:slug.html"
                                                    render=
                                                    { (props) => <Preview 
                                                        {...props} 
                                                        itemSelected={this.onItemSelected} 
                                                        item={Motel.item_selected}
                                                        isLoading={Motel.isLoading}/> 
                                                    }/>
                                            </Switch>
                                        </Router>
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
                                        <HomeMap
                                            Motel={Motel}
                                            Province={Province.selected}
                                            District={District.selected}
                                            Marker={this.onMapMarker}/>
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
                                <HomeMap
                                    Motel={Motel}
                                    Province={Province.selected}
                                    District={District.selected}
                                    Marker={this.onMapMarker}/>
                            </div>
                        </div>

                        <div className="col-sm-5">
                            <div className="home_fillter">
                                <Router>
                                    <Switch>
                                        <Route
                                            path="/"
                                            exact
                                            component={(props) => <HomeFillter
                                            {...props}
                                            Province={Province}
                                            onProvince={this.onChangeProvince}
                                            onDistrict={this.onChangeDistrict}
                                            District={District}
                                            Motel={Motel}
                                            selected={{
                                            province: Province.selected,
                                            district: District.selected
                                        }}/>}/>

                                        <Route
                                            path="/view/:id/:slug.html"
                                            render=
                                            { (props) => 
                                                <Preview 
                                                    {...props} 
                                                    itemSelected={this.onItemSelected} 
                                                    item={Motel.item_selected}
                                                    isLoading={Motel.isLoading}/>   
                                                }
                                            />

                                    </Switch>
                                </Router>

                            </div>
                        </div>

                    </div>
                </div>
            );
        }
    }

const mapStateToProps = (state) => {
    return {Province: state.Province, District: state.District, Motel: state.Motel}
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getProvince: () => dispatch(ProvinceAction.getProvinceRequest()),
        getDistrict: (id) => dispatch(DistrictAction.getDistrictRequest(id)),
        getMotel: () => dispatch(MotelAction.getMotelRequest()),
        getProvinceSelected: (id) => dispatch(ProvinceAction.getProvinceSelectedRequest(id)),
        getDistrictSelected: (id) => dispatch(DistrictAction.getDistrictSelectedRequest(id)),
        getItemMotel: (id) => dispatch(MotelAction.getMotelItemRequest(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);