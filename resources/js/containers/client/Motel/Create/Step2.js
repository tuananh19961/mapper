import React, {Component} from 'react';
import ImageUploader from 'react-images-upload'
import {Row, Col} from 'reactstrap';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geocode from "react-geocode";

class Step2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            latitude: 0,
            longitude: 0,
            center:{
                lat: 16.036500,
                lng: 108.218105
            }
        };
    }

    componentDidMount() {
        Geocode.setApiKey("AIzaSyAiQX1yfcvHCeM98e6asi-Wi-Y_H4-V1Qw");
    }

    onDrop = (pictureFiles, pictureDataURLs) => {
        this.setState({images: pictureFiles});
        this
            .props
            .onChangeImage(pictureFiles)
    }

    onClick = (t, map, coord) => {
        const {latLng} = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.props.onChangeCoord({
            latitude: lat,
            longitude: lng
           })

        this.setState({
            latitude: lat,
            longitude: lng
        })
    }

    componentWillReceiveProps(next){
        if(next.province){
            Geocode
            .fromAddress(next.province)
            .then(response => {
                const {lat, lng} = response.results[0].geometry.location;
                this.setState({
                   center: {
                       lat,
                       lng
                   }
                })
            }, error => {
                console.error(error);
            });
        }
    }

    render() {

        const icon2 = {
            url: '/client/img/core-img/marker_home.png',
            scaledSize: {
                width: 25,
                height: 25
            }
        };

        return (
            <Row>
                <Col sm="12">
                    <div className="section-title item-create">
                        <h2>Hình ảnh nhà trọ</h2>
                    </div>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        value={this.props.imagesrcc}
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withPreview={true}
                        name="images"
                        max="5"
                        withIcon={false}/>
                </Col>

                <Col sm="12">
                    <div className="section-title item-create">
                        <h2>Xác định vị trí trên bản đồ</h2>
                    </div>
                        <Map
                            google={this.props.google}
                            style={{
                            width: "100%",
                            margin: "auto"
                        }}
                            className={"map"}
                            zoom={12}
                            center={{
                            lat: this.state.center.lat,
                            lng: this.state.center.lng
                        }}
                            onClick={this.onClick}>
                        
                        {
                            (this.state.latitude !== 0 && this.state.longitude !== 0) && <Marker
                            name={'Your position'}
                            position={{lat: this.state.latitude , lng: this.state.longitude}}
                            icon={icon2} />
                        }
                        </Map>
                </Col>
            </Row>
        );
    }
}

export default GoogleApiWrapper({apiKey: ('AIzaSyAiQX1yfcvHCeM98e6asi-Wi-Y_H4-V1Qw')})(Step2);