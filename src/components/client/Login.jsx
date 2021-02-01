import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import axios from 'axios';
import AuthService from '../../misc/AuthService';
import CONSTANTS from '../../misc/Constants';
import { Select, Checkbox, Input } from 'antd';
import 'antd/dist/antd.css';
const { Option } = Select;

class Login extends React.Component {

  constructor(props){
    AuthService.checkGreeter();
    super(props);
    this.state = {
      isLoading: true,
      passwordStrength: 0,
      errorMessage: '',
      isRegistering: false,
      userDetails: [],
      regForm: {
        email: '',
        password: ''
      },
      regFormErrors: {
        email: '',
        password: ''
      }
    }

  }

  componentDidMount (){
    setTimeout(() => {
      this.setState({
        ...this.state,
        isLoading: false,
    });
    }, 1500);

  }

  registrationForm(event, name) {
    let value = event.target.value;
    var oldData = this.state.regForm;
    oldData[name] = value;
    this.setState({
      regForm: oldData,
    });
  }

  submitLoginForm = e => {

      this.setState({
          isRegistering: true,
          errorMessage: '',
        });
      e.preventDefault();

      axios.post(CONSTANTS.API_BASE_URL + "/auth/login", {...this.state.regForm})
      .then((response) => {

        let data = response.data.data;
        this.setState({
          userDetails: data,
        });
        window.location = "/unsubscribe/" + this.state.userDetails[1];

      }).catch((error) => {
        try{
          let errorResponse = error.response.data;
          let regFormErrors = this.state.regFormErrors;

          if(errorResponse.hasOwnProperty("errors")){

            if(errorResponse.errors.hasOwnProperty("email")){
              regFormErrors.email = errorResponse.errors.email;
            }

            if(errorResponse.errors.hasOwnProperty("password")){
              regFormErrors.password = errorResponse.errors.password;
            }
          }

          let errorMessage = 'Error: Could not connect to server';
          if(errorResponse.hasOwnProperty("message")){
            errorMessage = errorResponse.message;
          }

          this.setState({
            ...this.state,
            isRegistering: false,
            errorMessage: errorMessage,
            regFormErrors: regFormErrors
          });
        }catch(e){
          window.location = "/server-offline";
        }
      });

  }

  render(){

    return (
      <Fragment>
          <MetaTags>
          <title>Register - Analog</title>
          </MetaTags>
          <div class="nk-app-root">

          {
            this.state.isLoading ?
            <div class="pre-loader">
                <div class="text-center">  
                    <div class="spinner-border" role="status">    
                        <span class="sr-only">Loading...</span>  
                    </div>
                </div>
            </div>
            :
            <div class="nk-split nk-split-page nk-split-md">

            {/* left content start */}
            <div style={{backgroundImage: 'url("/images/main-left-image.jpg")', backgroundRepeat: "round", backgroundSize: "cover"}} class="nk-split-content nk-split-stretch bg-lighter d-flex toggle-break-lg toggle-slide toggle-slide-right" data-content="athPromo" data-toggle-screen="lg" data-toggle-overlay="true"></div>
            {/* left content end */}

              <div class="nk-split-content nk-block-area nk-block-area-column nk-auth-container">
                  <div class="nk-block nk-block-middle nk-auth-body">
                      {/* <div class="brand-logo pb-3">
                          <a href="html/general/index.html" class="logo-link">
                              <img class="logo-light logo-img logo-img-lg" src="/images/oBallot_logo.svg" srcset="/images/oBallot_logo.svg 2x" alt="logo" width="140" />
                              <img class="logo-dark logo-img logo-img-lg" style={{marginLeft: '-12px'}} src="/images/oBallot_logo.svg" srcset="/images/oBallot_logo.svg 2x" alt="logo-dark" width="140" />
                          </a>
                      </div> */}
                      <div class="nk-block-head">
                          <div class="nk-block-head-content">
                              <h5 class="nk-block-title">The Movie List</h5>
                              {/* <p>The Movie List</p> */}
                          </div>
                      </div>

                      {
                        this.state.errorMessage.length > 0 &&
                        <div class="example-alert nk-block-head">
                          <div class="alert alert-danger alert-icon">
                            <em class="icon ni ni-cross-circle"></em> 
                            {/* <strong>Update failed</strong> */}
                            {this.state.errorMessage}
                          </div>
                        </div>
                      }

                      <form onSubmit={this.submitLoginForm} method="POST">

                          <div class="form-group">
                              <div class="form-label-group">
                                  <label class="form-label">Email<span style={{color: "red"}}> *</span></label>
                              </div>
                              <Input size="large" required value={this.state.regForm.email} onChange={(e) => {this.registrationForm(e,"email");}} type="email" class="form-control form-control-lg"  placeholder="Enter your email address" />
                              {
                                this.state.regFormErrors.email.length > 0 && 
                                <p class="text-danger fs-12px">{this.state.regFormErrors.email}</p>
                              }
                          </div>
                          <div class="form-group">
                              <div class="form-label-group">
                                  <label class="form-label">Password<span style={{color: "red"}}> *</span></label>
                              </div>
                              <div class="form-control-wrap">
                                  <Input.Password size="large" minLength="6" required value={this.state.regForm.password} onChange={(e) => {this.registrationForm(e,"password");}} type="password" class="form-control form-control-lg" id="password" placeholder="Enter your password" />
                                  {
                                    this.state.regFormErrors.password.length > 0 && 
                                    <p class="text-danger fs-12px">{this.state.regFormErrors.password}</p>
                                  }
                              </div>
                          </div>
                          
                          <div class="form-group">
                              <button disabled={this.state.isRegistering} class="btn btn-lg btn-success btn-block">{ !this.state.isRegistering ? <span>Login</span> : <div class="spinner-border" role="status" style={{margin: "-6px"}}> </div> }</button>
                          </div>

                      </form>
                      <div class="form-note-s2 pt-4"> New on Movie List? <a href="/login" class="link-success">Register instead</a></div>
                  </div>
                  <div class="nk-block nk-auth-footer" style={{paddingTop: "0px"}}>
                      <div>
                          <p>&copy; 2021 movie list. All Rights Reserved.</p>
                      </div>
                  </div>
              </div>
          </div>
          }
          </div>
      </Fragment>
    );
  }
}

export default Login;