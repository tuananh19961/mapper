import React, {Component} from 'react';
import ShowMore from 'react-show-more';
import {withRouter} from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {isEmpty} from 'lodash';
import {formatCurrency, formatPhone} from './../../../services/base-service';

class Preview extends Component {
 
    constructor(props) {
        super(props);

        if(this.props.match.params.id){
            this.props.itemSelected(this.props.match.params.id)
        }
        
    }
    
    // componentDidMount(){
    //     window.scrollTo(0, 0);
    //     if(this.props.match.params.id){
    //         this.props.itemSelected(this.props.match.params.id)
    //     }

    // }



    render() {
        const {item, isLoading} = this.props;
        if(isLoading && isEmpty(item)){
            return(
            <div className="text-center">
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw mt-20"></i>
                <span className="sr-only">Loading...</span>
            </div>
            )
        }
        else
        return (
            <div className="preview">

                <div className="preview_top">
                    <div className="pull-left">
                        <button
                            type="button"
                            className="btn btn-outline btn-reset"
                            onClick=
                            { () => { this.props.history.goBack(); } }>
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
                                        item.details.map((item, index) => {
                                        return <div key={index} className="item-preview">
                                            <img src={`/upload/motel/${item.image}`}/>
                                        </div>
                                        })
                                    }
                        </Carousel>
                        
                        <div className="preview_info">
                            <div className="preview_info_top">
                                <div className="info_price">
                                    <div className="price_num">{formatCurrency(item.price)}</div>
                                    <div className="divide"></div>
                                </div>
                                <div className="info_name">
                                    <h2>
                                        <a href="#">{item.title}</a>
                                    </h2>
                                    <p>{`${item.address}, ${item.districts._name}, ${item.provinces._name}`}</p>
                                </div>
                            </div>

                            <div className="info_detail">
                                <div className="item_info_detail">
                                    <i className="fa fa-arrows"></i>
                                    <div className="info_detail_title">
                                        {item.area} m2</div>
                                </div>

                                <div className="item_info_detail">
                                    <i className="fa fa-home"></i>
                                    <div className="info_detail_title">
                                        {item.num_room} phòng</div>
                                </div>

                                <div className="item_info_detail">
                                    <i className="fa fa-group"></i>
                                    <div className="info_detail_title">
                                        {item.num_people} người</div>
                                </div>
                            </div>

                            <div className="text-center btn_contact">
                                <button type="button" className="btn btn-success">Liên hệ</button>
                                <div className="phone_number">
                                    <h3>{formatPhone(item.users.phone)}</h3>
                                </div>
                            </div>

                            <div className="item_info_desciption">
                                <ShowMore lines={3} more='Xem thêm' less='Rút gọn' anchorClass=''>
                                    {item.description}
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


export default withRouter(Preview);