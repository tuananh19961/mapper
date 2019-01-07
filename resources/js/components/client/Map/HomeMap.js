import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import Geocode from "react-geocode";
import {to_slug} from './../../../services/base-service';
import {MotelAction} from './../../../actions/index';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { isEmpty } from 'lodash';

const icon = {
    url: 'https://img.icons8.com/ultraviolet/1600/marker.png',
    scaledSize: {
        width: 35,
        height: 35
    }
};

const icon2 = {
    url: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    scaledSize: {
        width: 25,
        height: 25
    }
};

const icon3 = {
    url: 'https://cdn3.iconfinder.com/data/icons/e-commerce-pt-2/96/map_marker_mark_destination-512.png',
    scaledSize: {
        width: 25,
        height: 25
    }
};

class HomeMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            index: -1,
            center: {
                lat: 16.036500,
                lng: 108.218105
            },
            zoom: 12
        }
    }

    componentDidMount() {
        Geocode.setApiKey("AIzaSyAiQX1yfcvHCeM98e6asi-Wi-Y_H4-V1Qw");
        this
            .props
            .getMotel();
    }

    onMouseover = (props, marker, e) => {
        marker.setIcon(icon);
    }

    onMouseout = (props, marker, e) => {
        marker.setIcon(icon2);
    }

    onSelectItem = (props, marker, e) => {
            this.props.history.push(`/view/${props.data.id}/${to_slug(props.data.title)}.html`)
    }

    componentWillReceiveProps(next){
        if(!isEmpty(next.Province.selected)){
            if(!isEmpty(next.District.selected)){

                Geocode.fromAddress(`${next.District.selected.label} ${next.Province.selected.label}`).then(
                    response => {
                      const { lat, lng } = response.results[0].geometry.location;
                      this.setState({
                            center:{
                                lat: lat,
                                lng: lng
                            },
                            zoom:15
                      })
                    },
                    error => {
                      console.error(error);
                    }
                );
                    
            }
            else{
                Geocode.fromAddress(next.Province.selected.label).then(
                    response => {
                      const { lat, lng } = response.results[0].geometry.location;
                      this.setState({
                            center:{
                                lat: lat,
                                lng: lng
                            },
                            zoom:14
                      })
                    },
                    error => {
                      console.error(error);
                    }
                );
            }   
        }      
    }

    render() {
        var {Motel} = this.props;
        return (
            <Map
                google={this.props.google}
                className="map"
                id="onMap"
                center={{
                    lat: this.state.center.lat,
                    lng: this.state.center.lng
                }}
                zoom={this.state.zoom}>

                {/* List all location  */}
                {Motel
                    .data
                    .map((item, index) => {
                        return (
                        <Marker
                            index={index}
                            icon={item.id === Motel.item_hover.id? icon: icon2}
                            data={item}
                            onMouseover={this.onMouseover}
                            onMouseout={this.onMouseout}
                            onClick={this.onSelectItem}
                            title={item.title}
                            position={{
                            lat: item.latitude,
                            lng: item.longitude
                        }}
                            key={index}/>)
                    })
            }
            </Map>
        );
    }
}

const mapStateToProps = (state) => {
    return {Province: state.Province, District: state.District, Motel: state.Motel}
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getMotel: () => dispatch(MotelAction.getMotelRequest())
    }
}

export default withRouter(GoogleApiWrapper({apiKey: ('AIzaSyAiQX1yfcvHCeM98e6asi-Wi-Y_H4-V1Qw')})(connect(mapStateToProps, mapDispatchToProps)(HomeMap)));