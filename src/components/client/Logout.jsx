import React from "react";
import {Redirect} from "react-router-dom";
import cookie from 'react-cookies'
import { reactLocalStorage } from 'reactjs-localstorage';

class Logout extends React.Component {
    
  render(){
      // on local domain
      cookie.remove('access_token', { path: '/' });
      reactLocalStorage.clear();
      
      return (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
      );
  }

}

export default Logout;