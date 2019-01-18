import React, {Component} from 'react';
import {Container, Row, Col, Form, Button} from 'reactstrap';
import Step1 from './Step1';
import Step2 from './Step2';
import {connect} from 'react-redux';
import {MotelAction} from './../../../../actions/index';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    shouldComponentUpdate(prosp, state) {
        if (state.description !== this.state.description || state.images !== this.state.images) {
            return false;
        }
        return true;
    }

    onChangeImage = (data) => {
        this.setState({images: data})
    }

    onChangeHandle = (data) => {
        this.setState((prevState, props) => {
            return {
                ...prevState,
                ...data
            }
        });
    }

    onHandleSubmit = async(e) => {
        e.preventDefault();
        let form_data = new FormData();
        let data = this.state;
        let {User} = this.props;

        await Object
            .keys(data)
            .forEach(key => {
                if (Array.isArray(data[key])) {
                    for (var i = 0; i < data[key].length; i++) {
                        let images = data[key][i];
                        form_data.append("images[]", images);
                    }
                } else if(key === 'province') {
                    form_data.append(key, data[key].value);
                }else{
                    form_data.append(key, data[key]);
                }
            });

        if(User.data.id){
            form_data.append('id_user', User.data.id);
        }
        
        this
            .props
            .uploadMotel(form_data);
    }

    render() {

        return (
            <div className="create_motel">
                <Container>
                    <div className="section-title">
                        <h2>
                            <i className="fa fa-home mr-5"></i>Đăng nhà trọ mới</h2>
                    </div>
                    <Form onSubmit={this.onHandleSubmit}>
                        <Row>

                            <Col xs="12" sm="6">
                                <div className="section-title item-create">
                                    <h2>thông tin nhà trọ</h2>
                                </div>
                                <Step1 onChangeHandle={(u) => this.onChangeHandle(u)} />
                            </Col>

                            <Col xs="12" sm="6">
                                <Step2 onChangeImage={this.onChangeImage} onChangeCoord={this.onChangeHandle} province = {this.state.province && this.state.province.label}/>
                            </Col>
                        </Row>

                        <div className="text-center">
                            <Button outline color="success">
                                <i className="fa fa-upload mr-5"></i>Đăng tin</Button>
                        </div>

                    </Form>
                </Container>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {User: state.User}
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        uploadMotel: (data) => dispatch(MotelAction.uploadMotelRequest(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);