import React, {Component} from 'react';
import {formatCurrency} from './../../../services/base-service';
import {connect} from 'react-redux';
import {MotelAction} from './../../../actions/index';
import {withRouter, Link} from 'react-router-dom';
import {to_slug} from './../../../services/base-service';

class ItemResult extends Component {

    onShowView = (item) => {
        this.props.history.push(`/view/${item.id}/${to_slug(item.title)}.html`);
    }

    render() {
        let {item} = this.props;
        return (
            <div className="item-result" 
                onMouseEnter = { () => this.props.onMouseEnter(item)} 
                onMouseLeave = { () => this.props.onHoverOut()}
                onClick = {() => this.onShowView(item)}
            >
                <div className="img_preview">
                    <img src={`/upload/motel/${item.details[0].image}`}/>
                </div>

                <div className="item_detail">
                    <div className="item_price">
                        <div className="price">
                            {formatCurrency(item.price)}
                        </div>
                        <div className="item_action">
                            <i className="fa fa-thumb-up-o"></i>
                        </div>
                    </div>

                    <div className="item_address">{item.address}</div>

                    <div className="item_address distric">
                        {item.districts._name} - {item.provinces._name}
                    </div>

                    <div className="item_title">
                        <Link className="_2Ffwj" to={`/view/${item.id}/${to_slug(item.title)}.html`}>{item.title}</Link>
                    </div>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch,props) => {
    return {
        onMouseEnter: (item) => dispatch(MotelAction.onHoverItem(item)),
        onHoverOut: () => dispatch(MotelAction.onMouseOutItem())
    }
}
export default withRouter(connect(null,mapDispatchToProps)(ItemResult));