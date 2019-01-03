import React, {Component} from 'react';
import ShowMore from 'react-show-more';
import {withRouter} from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {isEmpty} from 'lodash';
import {formatCurrency, formatPhone} from './../../../services/base-service';
import { connect } from 'react-redux';
import {MotelAction} from './../../../actions/index';

class Preview extends Component {
    isMount = false;

    componentDidMount(){
        this.isMount = true;
        window.scrollTo(0, 0);
        if(this.props.match.params.id){
            this.props.getItemData(this.props.match.params.id)
        }
    }

    componentDidUpdate(next){
        console.log(next.match.params);
    }

    

    componentWillUnmount(){
        this.isMount = false;
    }
    
    render() {
        const {Motel} = this.props;

        if(Motel.isRequest){
            return(
            <div className="text-center">
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw mt-20"></i>
                <span className="sr-only">Loading...</span>
            </div>
            )
        }

        if(isEmpty(Motel.item_selected)){
            return(
            <div className="text-center">
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw mt-20"></i>
                <span className="sr-only">Loading...</span>
            </div>
            )
        }

        return (
            <div className="preview">
                <div className="preview_top">
                    <div className="pull-left">
                        <button
                            type="button"
                            className="btn btn-outline btn-reset"
                            onClick=
                            { () => { 
                                this.props.history.push('/'); 
                                this.props.resetMotelData();
                            }
                            }>
                            <i className="fa fa-arrow-left"></i>
                            Trở về trang danh sách
                        </button>
                    </div>
                    <div className="pull-right preview_action">
                        <ul>
                            <li>
                                <button type="button" className="btn btn-outline" title="Chia sẽ">
                                    <i className="fa fa-share-alt"></i>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="btn btn-outline" title="Ẩn">
                                    <i className="fa fa-thumbs-down"></i>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="btn btn-outline" title="Thích">
                                    <i className="fa fa-heart"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="clearfix"></div>

                <div className="box_preview">
                    <div className="preview_image">
                    
                        <Carousel showThumbs={false} transitionTime={500}>
                                    { 
                                        this.isMount && Motel.item_selected.details.map((i, index) => {
                                        return <div key={index} className="item-preview">
                                            <img src={`/upload/motel/${i.image}`}/>
                                        </div>
                                        })
                                    }
                        </Carousel>
                        
                        <div className="preview_info">
                            <div className="preview_info_top">
                                <div className="info_price">
                                    <div className="price_num">{formatCurrency(Motel.item_selected.price)}</div>
                                    <div className="divide"></div>
                                </div>
                                <div className="info_name">
                                    <h2>
                                        <a href="#">{Motel.item_selected.title}</a>
                                    </h2>
                                    <p>{`${Motel.item_selected.address}, ${Motel.item_selected.districts._name}, ${Motel.item_selected.provinces._name}`}</p>
                                </div>
                            </div>

                            <div className="info_detail">
                                <div className="item_info_detail">
                                    <i className="fa fa-arrows"></i>
                                    <div className="info_detail_title">
                                        {Motel.item_selected.area} m2</div>
                                </div>

                                <div className="item_info_detail">
                                    <i className="fa fa-home"></i>
                                    <div className="info_detail_title">
                                        {Motel.item_selected.num_room} phòng</div>
                                </div>

                                <div className="item_info_detail">
                                    <i className="fa fa-group"></i>
                                    <div className="info_detail_title">
                                        {Motel.item_selected.num_people} người</div>
                                </div>
                            </div>

                            <div className="text-center btn_contact">
                                <button type="button" className="btn btn-success">Liên hệ</button>
                                <div className="phone_number">
                                    <h3>{formatPhone(Motel.item_selected.users.phone)}</h3>
                                </div>
                            </div>

                            <div className="item_info_desciption">
                                <ShowMore lines={3} more='Xem thêm' less='Rút gọn' anchorClass=''>
                                    {Motel.item_selected.description}
                                </ShowMore>
                            </div>

                            <div className="action_bottom text-center">
                                <button type="button" className="btn btn-outline btn-reset">
                                    <i className="fa fa-eye"></i>
                                    Xem chi tiết
                                </button>

                                <button type="button" className="btn btn-outline btn-reset">
                                    <i className="fa fa-compass"></i>
                                    Dẫn đường
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        Motel: state.Motel
    }
}

const mapDispatchToProps = (dispatch,props) => {
    return {
        getItemData : (id) => dispatch(MotelAction.getMotelItemRequest(id)),
        resetMotelData: () => dispatch(MotelAction.resetMotelData())
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Preview));