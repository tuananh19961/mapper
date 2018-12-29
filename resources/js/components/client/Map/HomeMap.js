import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import Geocode from "react-geocode";
import {isEmpty, findIndex} from 'lodash';

const icon = {
    url: 'https://img.icons8.com/ultraviolet/1600/marker.png',
    scaledSize: {
        width: 30,
        height: 30
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
            ,
            
        }
    }

    componentDidMount() {
        Geocode.setApiKey("AIzaSyAiQX1yfcvHCeM98e6asi-Wi-Y_H4-V1Qw");

        let {Province, District} = this.props;

        if (!isEmpty(Province)) {
            if (isEmpty(District)) {
                Geocode
                    .fromAddress(Province._name)
                    .then(response => {
                        const {lat, lng} = response.results[0].geometry.location;
                        this.setState({
                            center: {
                                lat: lat,
                                lng: lng
                            },
                            zoom: 14
                        })
                    }, error => {
                        console.error(error);
                    });
            } else {
                Geocode
                    .fromAddress(`${District._prefix} ${District._name}, ${Province._name}`)
                    .then(response => {
                        const {lat, lng} = response.results[0].geometry.location;
                        this.setState({
                            center: {
                                lat: lat,
                                lng: lng
                            },
                            zoom: 14
                        })
                    }, error => {
                        console.error(error);
                    });
            }
        }
    }

    componentWillReceiveProps(next) {
        if (!isEmpty(next.Province)) {
            if (isEmpty(next.District)) {
                Geocode
                    .fromAddress(next.Province._name)
                    .then(response => {
                        const {lat, lng} = response.results[0].geometry.location;
                        this.setState({
                            center: {
                                lat: lat,
                                lng: lng
                            },
                            zoom: 14
                        })
                    }, error => {
                        console.error(error);
                    });
            } else {
                let {District, Province} = next;
                Geocode
                    .fromAddress(`${District._prefix} ${District._name}, ${Province._name}`)
                    .then(response => {
                        const {lat, lng} = response.results[0].geometry.location;
                        this.setState({
                            center: {
                                lat: lat,
                                lng: lng
                            },
                            zoom: 14
                        })
                    }, error => {
                        console.error(error);
                    });
            }

        }
    }

    onMouseover = (props, marker, e) => {
        marker.setAnimation(1)
    }

    onMouseout = (props, marker, e) => {
        marker.setAnimation(0)
    }

    render() {
        var {Motel} = this.props;

        return (
            <Map
                google={this.props.google}
                className="map"
                id="onMap"
                initialCenter={{
                lat: 16.036500,
                lng: 108.218105
            }}
                center={{
                lat: this.state.center.lat,
                lng: this.state.center.lng
            }}
                zoom={this.state.zoom}>

                {/* List all location  */}
                {Motel
                    .data
                    .map((item, index) => {
                        return (<Marker
                            index={index}
                            icon={icon}
                            animation={item.id === Motel.item_hover.id ? 1 : 0}
                            onMouseover={this.onMouseover}
                            onMouseout={this.onMouseout}
                            title={'The marker`s title will appear as a tooltip.'}
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

export default GoogleApiWrapper({apiKey: ('AIzaSyAiQX1yfcvHCeM98e6asi-Wi-Y_H4-V1Qw')})(HomeMap);