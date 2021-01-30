import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import axios from 'axios';
// import OtpInput from 'react-otp-input';
import OTPInput, { ResendOTP } from "otp-input-react";
import AuthService from '../../misc/AuthService';
import CONSTANTS from '../../misc/Constants';
import { Select, Checkbox, Input } from 'antd';
import 'antd/dist/antd.css';
const { Option } = Select;

class Register extends React.Component {

  constructor(props){
    AuthService.checkGreeter();
    super(props);
    this.state = {
      isLoading: true,
      errorMessage: '',
      isVerifying: false,
      verificationSuccess: false,
      fullName: '',
      regForm: {
        // fullName: '',
        code: '',
      },
      regFormErrors: {
        fullName: '',
        code: '',
      }
    }

  }

  checkVerificationCodeOnChange(event, name) {
    // let value = event.target.value;
    // alert(event);

    // console.log("updating for name = " + name + " and val = " + value);
    var oldData = this.state.regForm;
    oldData[name] = event;
    this.setState({
      regForm: oldData,
    });
  }

  componentDidMount (){

    const { match: { params } } = this.props;
    
    if(params.fullName){
    this.setState({
        ...this.state,
        fullName: params.fullName,
        isLoading: false
    })
    }

  }

  checkVerificationCode = e => {

      this.setState({
          isVerifying: true,
          errorMessage: '',
        });
      e.preventDefault();

      axios.post(CONSTANTS.API_BASE_URL + "/auth/verify-token", {...this.state.regForm})
      .then((response) => {
        // window.location = "/email-verification/check/" + this.state.regForm.email;
        this.setState({
            verificationSuccess: true,
            isVerifying: false,
        });

      }).catch((error) => {
        try{
          let errorResponse = error.response.data;
          let regFormErrors = this.state.regFormErrors;

          if(errorResponse.hasOwnProperty("errors")){
            if(errorResponse.errors.hasOwnProperty("code")){
              regFormErrors.code = errorResponse.errors.code;
            }
          }

          let errorMessage = 'Error: Could not connect to server';
          if(errorResponse.hasOwnProperty("message")){
            errorMessage = errorResponse.message;
          }

          this.setState({
            ...this.state,
            isVerifying: false,
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
                      <div class="nk-block-head">
                          <div class="nk-block-head-content">
                              <h5 class="nk-block-title">Hello {this.state.fullName} we have sent you a verification email Please enter your 5 digit code here </h5>
                              {/* <p>The Movie List</p> */}
                          </div>
                      </div>

                      {
                        this.state.verificationSuccess &&
                        <div class="example-alert nk-block-head">
                          <div class="alert alert-success alert-icon">
                            <em class="icon ni ni-check"></em> 
                            <strong>Email Verified</strong>
                          </div>
                        </div>
                      }

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

                      <form onSubmit={this.checkVerificationCode} method="POST">

                          <div class="form-group">
                              {/* <Input size="large" required value={this.state.regForm.fullName} onChange={(e) => {this.registrationForm(e,"fullName");}} type="text" class="form-control form-control-lg" />
                              {
                                this.state.regFormErrors.fullName.length > 0 && 
                                <p class="text-danger fs-12px">{this.state.regFormErrors.fullName}</p>
                              } */}

                            <OTPInput
                                value={this.state.regForm.code}
                                onChange={(e) => {this.checkVerificationCodeOnChange(e,"code");}}
                                autoFocus
                                OTPLength={5}
                                otpType="number"
                            />

                          </div>
                          
                          <div class="form-group">
                              <button disabled={this.state.isVerifying} class="btn btn-lg btn-success btn-block">{ !this.state.isVerifying ? <span>Confirm Email Address</span> : <div class="spinner-border" role="status" style={{margin: "-6px"}}> </div> }</button>
                          </div>

                      </form>
                      <div class="form-note-s2 pt-4"> Didn't get an Email? <a href="/login" class="link-success">Re-send Verification</a></div>
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