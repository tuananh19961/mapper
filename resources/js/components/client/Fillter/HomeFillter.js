import React, {Component} from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import Select from 'react-select';
import {connect} from 'react-redux';
import {ProvinceAction, DistrictAction, MotelAction} from './../../../actions/index';
import ListResult from './ListResult';

class HomeFillter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                min: 2,
                max: 50000
            },
            province: -1,
            district: -1
        };
    }

    onProvinceChange = (e) => {
        this.setState({province: e.value, district: -1})
        this.props.getProvinceSelected(e);
        this
            .props
            .getDistrict(e.value);

    }

    onDistrictChange = (e) => {
        this.setState({district: e.value})
        this.props.getDistrictSelected(e);
    }

    resetFillter = () => {
        this.setState({province: -1, district: -1})
    }

    componentDidMount() {
        this
            .props
            .getProvince();
    }

    // RENDER FUNCTION
    render() {
        const {Province, District, Motel} = this.props;

        var provinces = [];
        var districts = [];

        if (District.isRequest === false && District.isLoading === false) {
            District
                .data
                .map((item, index) => {
                    districts.push({value: item.id, label: `${item._prefix} ${item._name}`});
                })
        }

        if (Province.isLoading === false) {
            Province
                .data
                .map((item, index) => {
                    provinces.push({value: item.id, label: item._name});
                })
        }

        if (this.state.district === -1 && this.state.province === -1) {
            districts = [];
        }

        return (
            <div className="wrapper_fill">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#">Home</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Library</li>
                    </ol>
                </nav>

                <div className="box_fillter">
                    <form>

                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Giá</label>
                            <div className="col-sm-8">
                                <InputRange
                                    formatLabel={value => `${value} đ`}
                                    maxValue={100000}
                                    minValue={0}
                                    value={this.state.value}
                                    onChange={value => this.setState({value})}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Tỉnh</label>
                            <div className="col-sm-8">
                                <Select
                                    placeholder={< div > Tỉnh ...</div>}
                                    name="form-field-name"
                                    value={this.state.province !== -1 && provinces.find(option => option.value === this.state.province)}
                                    onChange={this.onProvinceChange}
                                    options={provinces}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Quận</label>
                            <div className="col-sm-8">
                                <Select
                                    placeholder={< div > Quận,
                                Huyện ...</div>}
                                    name="form-field-name"
                                    value={this.state.district !== -1 && districts.find(option => option.value === this.state.district)}
                                    onChange={this.onDistrictChange}
                                    options={districts}/>
                            </div>
                        </div>

                        <div className="form_reset">
                            <button
                                type="button"
                                className="btn btn-outline btn-reset pull-right"
                                onClick={this.resetFillter}>
                                <i className="fa fa-repeat"></i>
                                Reset
                            </button>
                        </div>

                    </form>
                </div>

                {/* RESULT FILLTER */}
                <ListResult 
                    Motel = {Motel}
                />    

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
        getProvinceSelected: (item) => dispatch(ProvinceAction.getProvinceSelected(item)),
        getDistrictSelected: (item) => dispatch(DistrictAction.getDistrictSelected(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeFillter);