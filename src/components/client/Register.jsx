import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import axios from 'axios';
import AuthService from '../../misc/AuthService';
import CONSTANTS from '../../misc/Constants';
import { Select, Checkbox, Input } from 'antd';
import 'antd/dist/antd.css';
import PasswordStrengthBar from 'react-password-strength-bar';
const { Option } = Select;

class Register extends React.Component {

  constructor(props){
    AuthService.checkGreeter();
    super(props);
    this.state = {
      isLoading: true,
      passwordStrength: 0,
      errorMessage: '',
      isRegistering: false,
      regForm: {
        fullName: '',
        email: '',
        password: ''
      },
      regFormErrors: {
        fullName: '',
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
    // console.log("updating for name = " + name + " and val = " + value);
    var oldData = this.state.regForm;
    oldData[name] = value;
    this.setState({
      regForm: oldData,
    });
  }

  submitRegistrationForm = e => {

      this.setState({
          isRegistering: true,
          errorMessage: '',
        });
      e.preventDefault();

      axios.post(CONSTANTS.API_BASE_URL + "/auth/register", {...this.state.regForm})
      .then((response) => {
          alert("Good");
        window.location = "/email-verification/check/" + this.state.regForm.fullName;

      }).catch((error) => {
        try{
          let errorResponse = error.response.data;
          let regFormErrors = this.state.regFormErrors;

          if(errorResponse.hasOwnProperty("errors")){
            if(errorResponse.errors.hasOwnProperty("fullName")){
              regFormErrors.fullName = errorResponse.errors.fullName;
            }

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

                      <form onSubmit={this.submitRegistrationForm} method="POST">

                          <div class="form-group">
                              <div class="form-label-group">
                                <label class="form-label">Full name<span style={{color: "red"}}> *</span></label>
                              </div>
                              <Input size="large" required value={this.state.regForm.fullName} onChange={(e) => {this.registrationForm(e,"fullName");}} type="text" class="form-control form-control-lg"  placeholder="Enter your full name" />
                              {
                                this.state.regFormErrors.fullName.length > 0 && 
                                <p class="text-danger fs-12px">{this.state.regFormErrors.fullName}</p>
                              }
                          </div>

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
                                  <label class="form-label">Password (min six characters)<span style={{color: "red"}}> *</span></label>
                              </div>
                              <div class="form-control-wrap">
                                  <Input.Password size="large" minLength="6" required value={this.state.regForm.password} onChange={(e) => {this.registrationForm(e,"password");}} type="password" class="form-control form-control-lg" id="password" placeholder="Enter your password" />
                                  { this.state.regForm.password.length > 0 ? <PasswordStrengthBar onChangeScore={(score) => {
                                    this.setState({
                                      ...this.state,
                                      passwordStrength: score
                                    });
                                  }} className="eg-bar" shortScoreWord="Too short" scoreWords={this.scoreWords} barColors={this.colors} password={this.state.regForm.password} /> : <span></span> }
                                  
                                  {
                                    this.state.regFormErrors.password.length > 0 && 
                                    <p class="text-danger fs-12px">{this.state.regFormErrors.password}</p>
                                  }
                              </div>
                          </div>
                          
                          <div class="form-group">
                              <p>By subscribing you agree to the analogteams <a href="#" class="link-success">Terms & Condition</a> & <a href="#" class="link-success">Privacy Policy</a></p>
                              <button disabled={this.state.isRegistering} class="btn btn-lg btn-success btn-block">{ !this.state.isRegistering ? <span>Send Me Movies</span> : <div class="spinner-border" role="status" style={{margin: "-6px"}}> </div> }</button>
                          </div>

                      </form>
                      <div class="form-note-s2 pt-4"> Already have an account ? <a href="/login" class="link-success">Login instead</a></div>
                  </div>
                  <div class="nk-block nk-auth-footer" style={{paddingTop: "0px"}}>
                      <div>
                          <p>&copy; 2021 analogteams. All Rights Reserved.</p>
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

export default Register;