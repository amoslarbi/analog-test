import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import axios from 'axios';
// import OtpInput from 'react-otp-input';
import OTPInput, { ResendOTP } from "otp-input-react";
import AuthService from '../../misc/AuthService';
import CONSTANTS from '../../misc/Constants';
import { Select, Checkbox, Input } from 'antd';
import * as initials from "initials";
import 'antd/dist/antd.css';
const { Option } = Select;

class unsubscribe extends React.Component {

  constructor(props){
    AuthService.checkGreeter();
    super(props);
    this.state = {
      isLoading: true,
      errorMessage: '',
      isVerifying: false,
      verificationSuccess: false,
      resendCodeSuccess: false,
      userDetails: [],
      email: '',
    }

  }

  componentDidMount (){

    const { match: { params } } = this.props;
    
    if(params.email){
    this.setState({
        ...this.state,
        email: params.email,
        isLoading: false
    })

    axios.post(CONSTANTS.API_BASE_URL + "/auth/get-user-details", {email: params.email})
    .then((response) => {
      this.setState({
          isLoading: false,
      });
      let data = response.data.data;
      this.setState({
        userDetails: data,
    });

    }).catch((error) => {
        this.setState({
            isLoading: false,
        });
        alert("Request Failed");
    });

    }

  }

  checkVerificationCode = e => {

      this.setState({
          isVerifying: true,
          errorMessage: '',
        });
      e.preventDefault();

      axios.post(CONSTANTS.API_BASE_URL + "/auth/unsubscribe", {email: this.state.email})
      .then((response) => {
        this.setState({
            verificationSuccess: true,
            isVerifying: false,
        });

        setTimeout(() => {
          window.location = "/register";
        }, 2000);
        

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
                              <h5 class="nk-block-title">Unsubscribe to our Daily movie recommendations</h5>
                              {/* <p>The Movie List</p> */}
                          </div>
                      </div>

                      {
                        this.state.verificationSuccess &&
                        <div class="example-alert nk-block-head">
                          <div class="alert alert-success alert-icon">
                            <em class="icon ni ni-check"></em> 
                            <strong>You have successfully Unsubscribed. Redirecting...</strong>
                          </div>
                        </div>
                      }

                      {
                        this.state.errorMessage.length > 0 &&
                        <div class="example-alert nk-block-head">
                          <div class="alert alert-danger alert-icon">
                            <em class="icon ni ni-cross-circle"></em> 
                            {this.state.errorMessage}
                          </div>
                        </div>
                      }

                      <form onSubmit={this.checkVerificationCode} method="POST">
                          <div class="form-group">

                          </div>
                          
                          <div class="form-group">
                              <button disabled={this.state.isVerifying} class="btn btn-lg btn-success btn-block">{ !this.state.isVerifying ? <span>Stop Sending Movies</span> : <div class="spinner-border" role="status" style={{margin: "-6px"}}> </div> }</button>
                          </div>
                      </form>
                  </div>
                  <div class="nk-block nk-auth-footer" style={{paddingTop: "0px"}}>
                      <div>
                          <p>&copy; 2021 movie list. All Rights Reserved.</p>
                      </div>
                  </div>
                  
              </div>
              <div style={{margin: "12px"}} class="user-avatar sm"><span>{initials(this.state.userDetails[0]).substring(0, 2)}</span></div>
          </div>
          }
          </div>
      </Fragment>
    );
  }
}

export default unsubscribe;