import React, {Component} from 'react';
import {
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button,
    FormText,
    FormFeedback
} from 'reactstrap';
import Select from 'react-select';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import {connect} from 'react-redux';
import {ProvinceAction, DistrictAction} from './../../../../actions/index';
import {formatCurrency} from './../../../../services/base-service';


class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            province: -1,
            district: -1,
            address: '',
            area: 0,
            price: 0,
            room: 0,
            title: ''
        }
    }

    onProvinceChange = (e) => {
        this.setState({province: e.value, district: -1});
        this
            .props
            .onChangeHandle({province: e})
        this
            .props
            .getDistrict(e.value);
    }

    onDistrictChange = (e) => {
        this.setState({district: e.value});
        this
            .props
            .onChangeHandle({district: e.value})
    }

    componentDidMount() {
        this
            .props
            .getProvince();
    }

    handleChangeEditor = (value) => {
        this.setState({text: value})
        this
            .props
            .onChangeHandle({description: value})
    }

    onHandlePriceChange = async(e) => {
        const {target} = event;
        const value = target.type === 'number'
            ? parseInt(target.value)
            : target.value;
        const {name} = target;

        this
            .props
            .onChangeHandle({[name]: value})

        if (!Number.isNaN(value)) {
            await this.setState({[name]: value});
        }
    }

    onHandleChange = async(event) => {
        const {target} = event;
        const value = target.type === 'number'
            ? parseInt(target.value)
            : target.value;
        const {name} = target;

        this
            .props
            .onChangeHandle({[name]: value})

        if (!Number.isNaN(value)) {
            await this.setState({[name]: value});
        }
       
        
    }

    render() {
        const {Province, District} = this.props;
        let provinces = [];
        let districts = [];

        if (District.isRequest === false && District.isLoading === false && District.status === true) {
            District
                .data
                .map((item) => {
                    districts.push({value: item.id, label: `${item._prefix} ${item._name}`});
                })
        }

        if (Province.isLoading === false && Province.status === true) {
            Province
                .data
                .map((item) => {
                    provinces.push({value: item.id, label: item._name});
                })
        }

        return (
            <Row>
                <Col sm="12">
                    <FormGroup>
                        <Label>Tỉnh</Label>
                        <Select
                            placeholder={< div > Tỉnh thành ...</div>}
                            name="provinces"
                            value={this.state.province !== -1 && provinces.find(option => option === this.state.province)}
                            onChange={this.onProvinceChange}
                            options={provinces}/>
                    </FormGroup>
                </Col>

                <Col sm="12">
                    <FormGroup>
                        <Label>Tỉnh</Label>
                        <Select
                            placeholder={< div > Quận huyện ...</div>}
                            name="districts"
                            required
                            value={this.state.district !== -1 && districts.find(option => option === this.state.district)}
                            onChange={this.onDistrictChange}
                            options={districts}/>
                    </FormGroup>
                </Col>

                <Col sm="12">
                    <FormGroup>
                        <Label>Đường, số nhà</Label>
                        <Input
                            type="text"
                            name="address"
                            defaultValue={this.state.address}
                            onBlur={this.onHandleChange}
                            placeholder="Đường, số nhà"
                            required/>

                    </FormGroup>
                </Col>

                <Col sm="12">
                    <FormGroup>
                        <Label>Diện tích</Label>
                        <Input
                            type="number"
                            name="area"
                            min="0"
                            defaultValue={this.state.area}
                            onBlur={this.onHandleChange}
                            placeholder="Diện tích"
                            required/>
                        <FormFeedback>
                            Sai định dạng email.
                        </FormFeedback>
                    </FormGroup>
                </Col>

                <Col sm="12">
                    <FormGroup>
                        <Label>Giá</Label>
                        <Input
                            type="number"
                            min="0"
                            name="price"
                            value={this.state.price}
                            onChange={this.onHandlePriceChange}
                            placeholder="Giá phòng"
                            required/> {(this.state.price != 0) && <div className="valid-feedback show">{formatCurrency(this.state.price)}</div>
}

                    </FormGroup>
                </Col>

                <Col sm="12">
                    <FormGroup>
                        <Label>Số phòng</Label>
                        <Input
                            type="number"
                            name="room"
                            min="0"
                            defaultValue={this.state.room}
                            onBlur={this.onHandleChange}
                            placeholder="Số phòng cần cho thuê"
                            required/>
                        <FormFeedback>
                            Sai định dạng email.
                        </FormFeedback>
                    </FormGroup>
                </Col>

                <Col sm="12">
                    <FormGroup>
                        <Label>Tiêu đề</Label>
                        <Input
                            type="text"
                            name="title"
                            id="exampleEmail"
                            defaultValue={this.state.title}
                            onBlur={this.onHandleChange}
                            placeholder="Tiêu đề tin đăng"
                            required/>
                        <FormFeedback>
                            Sai định dạng email.
                        </FormFeedback>
                    </FormGroup>
                </Col>

                <Col sm="12">
                    <FormGroup>
                        <Label>Mô tả</Label>
                        <ReactQuill value={this.state.text} onChange={this.handleChangeEditor}/>
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {Province: state.Province, District: state.District}
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getProvince: () => dispatch(ProvinceAction.getProvinceRequest()),
        getDistrict: (id) => dispatch(DistrictAction.getDistrictRequest(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step1);