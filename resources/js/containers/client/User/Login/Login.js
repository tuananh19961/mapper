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

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            validate: {
                emailState: '',
                passState:''
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

    validatePassword(e){
        const {validate} = this.state;
        if (e.target.value.length >= 6) {
            validate.passState = 'has-success';
        } else {
            validate.passState = 'has-danger';
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

    onHandleLogin = (e) => {
        e.preventDefault();
        this.props.userLogin({
            email: this.state.email,
            password: this.state.password
        });
 
    }

    componentWillReceiveProps(next){
        if(next.User.isLoading === false && next.User.status === false){
            this.setState({
                error: next.User.messages
            });
        }
        else{
            this.setState({
                email: '',
                password: '',
                error: '',
                validate: {
                    emailState: '',
                    passState:''
                }
            });
            this.props.onLogin();
        }
    }

    render() {
        const {email, password} = this.state;

        return (
            <Container className="login-form">
                <div className="text-center img-top-login">
                    <img src="/client/img/core-img/motel.png" alt=""/>
                </div>
                <Form className="form" onSubmit={this.onHandleLogin}>

                    <div className="text-center">
                        {this.state.error ? <FormText><b style={{color: 'red'}}>{this.state.error}</b></FormText> : ''}
                    </div>

                    <Row>
                        <Col sm = "12">
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="exampleEmail"
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
                        <Col sm = "12">
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="examplePassword"
                                    placeholder="Password"
                                    valid={this.state.validate.passState === 'has-success'}
                                    invalid={this.state.validate.passState === 'has-danger'}
                                    value={password}
                                    onChange={
                                        (e) => {
                                            this.validatePassword(e)
                                            this.handleChange(e)
                                        }       
                                    }/>
                                    <FormFeedback>
                                        Mật khẩu phải nhiều hơn 6 ký tự.
                                    </FormFeedback> 
                            </FormGroup>
                        </Col>
                    </Row>
                  
                    <div className="text-center">
                        <Button outline 
                            color={
                                this.state.validate.emailState === 'has-danger'
                                || this.state.validate.passState === 'has-danger'
                                || email === '' 
                                || password === ''
                                ? "danger"
                                : "success"
                            } 
                            disabled = {
                                this.state.validate.emailState === 'has-danger'
                                || this.state.validate.passState === 'has-danger'
                                || email === '' 
                                || password === '' 
                                ? true 
                                : false}
                        >
                            <i className="fa fa-sign-in"></i> Login
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
        userLogin : (data) => dispatch(UserAction.userLoginRequest(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);