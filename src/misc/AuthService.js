import cookie from 'react-cookies';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from "axios";

const AuthService =  {
    checkProtected: () => {
        var access_token = cookie.load('access_token');
				var userObj = reactLocalStorage.getObject('userObj');

        if(access_token === undefined || access_token  == ""){
						window.location = "/logout"
						return;
        }

				if(JSON.stringify(userObj) === '{}'){
					window.location = "/logout";
				}else if(!userObj.emailVerificationStatus){
					window.location = "/email-verification/check/"+userObj.email
        }
				
    },

    getAuth: () => {
        var userObj = reactLocalStorage.getObject('userObj');
        var access_token = cookie.load('access_token');
        if(JSON.stringify(userObj) === '{}' || access_token === ''){
            window.location = "/logout";
        }   
        
        return {
          "user": userObj,
          "access_token": access_token
        }
    },

    checkGreeter: () => {
        var access_token = cookie.load('access_token');
        var userObj = reactLocalStorage.getObject('userObj');
        if(access_token !== undefined && userObj.emailVerificationStatus){
          window.location = "/dashboard";
        }  
    },

    getAxiosHeaders: () => {
        var access_token = cookie.load('access_token');
        return { headers: {"Authorization" : `Bearer ${access_token}`} }
    },

    getAxiosUploadHeaders: () => {
        var access_token = cookie.load('access_token');
        return { 
            headers: {
                "Authorization" : `Bearer ${access_token}`, 
                "content-type": "multipart/form-data"
            } 
        }
    }
};

export default AuthService;