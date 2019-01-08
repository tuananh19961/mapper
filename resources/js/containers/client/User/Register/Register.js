import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormText,
    FormFeedback
} from 'reactstrap';
import { connect } from 'react-redux';
import { UserAction } from './../../../../actions/index';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            phone: '',
            status: false,
            validate: {
                emailState: '',
                passState: '',
                phoneState:''
            }
        }
    }

    validateEmail(e) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const {validate} = this.state
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({validate})
    }

    validatePassword(e) {
        const {validate} = this.state;
        if (e.target.value.length >= 6) {
            validate.passState = 'has-success';
        } else {
            validate.passState = 'has-danger';
        }
        this.setState({validate});
    }

    validatePhone(e) {
        const {validate} = this.state;
        const regexp = /^\d{10,11}$/;
        const checkingResult = regexp.exec(e.target.value);

        if(e.target.validity.valid){
            if (checkingResult !== null) {
                validate.phoneState = 'has-success';
            } else {
                validate.phoneState = 'has-danger';
            }
        }
        else{
            validate.phoneState = 'has-danger';
        }
        this.setState({validate});
    }


    handleChange = async(event) => {
        const {target} = event;
        const value = target.type === 'checkbox'
            ? target.checked
            : target.value;
        const {name} = target;
        await this.setState({[name]: value});
    }

    onHandleRegister = (e) => {
        e.preventDefault();
        this.props.userRegister({
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            name: this.state.name
        });

        this.setState({
            status: true
        })
    }

    componentWillReceiveProps(next){
        if(next.User.register_status === true){
            this.setState({
                email: '',
                password: '',
                name: '',
                phone: '',
                validate: {
                    emailState: '',
                    passState: '',
                    phoneState:''
                }
            });
        }
    }

    render() {
        const {email, password, name, phone, status} = this.state;
        const { User } = this.props;

        return (
            <Container className="login-form">
                    <div className="text-center">
                        <h3 style={{marginTop: '15px'}}>ĐĂNG KÝ</h3>  
                    </div>
                <Form className="form" onSubmit={this.onHandleRegister}>
                    {
                    status 
                    && 
                    <div className="text-center">
                        { (User.register_status)
                            ? <FormText><b style={{color: '#38c172'}}>{User.register_messages}</b></FormText> 
                            : <FormText><b style={{color: 'red'}}>{User.register_messages}</b></FormText> }
                    </div>
                    }
                    <Row>
                        <Col sm="12">
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="abc@email.com"
                                    value={email}
                                    valid={this.state.validate.emailState === 'has-success'}
                                    invalid={this.state.validate.emailState === 'has-danger'}
                                    onChange={(e) => {
                                    this.validateEmail(e);
                                    this.handleChange(e);
                                }}/>

                                <FormFeedback>
                                    Sai định dạng email.
                                </FormFeedback>
                            </FormGroup>
                        </Col>

                        <Col sm="12">
                            <FormGroup>
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    valid={this.state.validate.passState === 'has-success'}
                                    invalid={this.state.validate.passState === 'has-danger'}
                                    value={password}
                                    required
                                    onChange={(e) => {
                                        this.validatePassword(e)
                                        this.handleChange(e)
                                    }}/>
                                <FormFeedback>
                                    Mật khẩu phải nhiều hơn 6 ký tự.
                                </FormFeedback>
                            </FormGroup>
                        </Col>

                        <Col sm="12">
                            <FormGroup>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Full name"
                                    value={name}
                                    required
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }}/>
                            </FormGroup>
                        </Col>

                        <Col sm="12">
                            <FormGroup>
                                <Label>Phone</Label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    pattern="[0-9]*"
                                    valid={this.state.validate.phoneState === 'has-success'}
                                    invalid={this.state.validate.phoneState === 'has-danger'}
                                    value={phone}
                                    required
                                    onChange={(e) => {
                                        this.validatePhone(e)
                                        this.handleChange(e)
                                    }}/>
                                <FormFeedback>
                                    Số điện thoại phải có 10 - 11 chữ số.
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>

                    <div className="text-center">
                        <Button
                            outline
                            color={
                                this.state.validate.emailState === 'has-danger' 
                                || this.state.validate.passState === 'has-danger' 
                                || this.state.validate.phoneState === 'has-danger' 
                                || email === '' 
                                || password === ''
                                || name === ''
                                || phone === ''
                            ? "danger"
                            : "success"}
                            disabled=
                            { 
                                this.state.validate.emailState === 'has-danger' 
                                || this.state.validate.passState === 'has-danger' 
                                || this.state.validate.phoneState === 'has-danger' 
                                || email === '' 
                                || password === ''
                                || name === ''
                                || phone === ''
                                || (User.isRequest === true) 
                            ? true 
                            : false
                            }>
                            {
                                ( User.isRequest === true)
                                ? <span><i className="fa fa-spinner fa-pulse fa-2x fa-fw mr-5"></i> Đang tải</span>
                                : <span><i className="fa fa-sign-in mr-5"></i>Đăng ký</span>
                            }
                        </Button>
                    </div>

                </Form>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return{
       User: state.User
    }
}

const mapDispatchToProps = (dispatch,props) => {
    return {
        userRegister : (data) => dispatch(UserAction.userRegisterRequest(data))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);