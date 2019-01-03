import React, {Component} from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import ItemResult from './ItemResult';
import Select from 'react-select';
import {isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {ProvinceAction, DistrictAction, MotelAction} from './../../../actions/index';

class HomeFillter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            todosPerPage: 4,
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

        this
            .props
            .getDistrict(e.value);
    }

    onDistrictChange = (e) => {
        this.setState({district: e.value})

    }

    resetFillter = () => {
        this.setState({province: -1, district: -1})
    }

    componentDidMount() {
        this
            .props
            .getProvince();
    }

    // PAGINATION REACTJS
    handleClick(e) {
        this.setState({currentPage: e});
    }
    onSizePage = (data) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / this.state.todosPerPage); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    }

    // RENDER FUNCTION
    render() {
        const {Province, District, Motel} = this.props;

        const {currentPage, todosPerPage} = this.state;
        const indexOfLast = currentPage * todosPerPage;
        const indexOfFirst = indexOfLast - todosPerPage;

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
                <div className="result_fillter">

                    <div className="top_result">

                        <div className="item-top">
                            <select id="inputState" className="form-control">
                                <option>Sort...</option>
                                <option>...</option>
                            </select>
                        </div>

                        <div className="item-top num_results">
                            <span>{Motel.data.length}
                                kết quả</span>
                        </div>
                    </div>

                    <div className="list_results">

                        {Motel.isLoading
                            ? <div className="text-center">
                                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw mt-20"></i>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            : !isEmpty(Motel.data)
                                ? Motel
                                    .data
                                    .slice(indexOfFirst, indexOfLast)
                                    .map((item, index) => {
                                        return <ItemResult item={item} key={index}/>
                                    })
                                : <div className="text-center">
                                    <span className="mt-20">
                                        Không có kết quả phù hợp!
                                    </span>
                                </div>
                        }

                        {!isEmpty(Motel.data) && <div className="text-center">
                            <ul className="pagination">
                                {this
                                    .onSizePage(Motel.data)
                                    .map((num, index) => {
                                        return <li 
                                            className="page-item" 
                                            key={index} 
                                            onClick={() => this.handleClick(num)}
                                        >
                                            {num}
                                        </li>
                                    })}
                            </ul>
                        </div>
                        }

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
        getDistrictSelected: (id) => dispatch(DistrictAction.getDistrictSelectedRequest(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeFillter);