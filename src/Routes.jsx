import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from './components/client/Register';
import Unsubscribe from './components/client/Unsubscribe';
import Login from './components/client/Login';
import EmailVerification from './components/client/EmailVerification';

class Routes extends React.Component {
  render(){
    return (
      <Router>
        <Switch>
          
          {/* Greeter Routes */}
          {/* <Route exact path={`${process.env.PUBLIC_URL + "/"}`} component={Login} /> */}
          {/* <Route exact path={`${process.env.PUBLIC_URL + "/login"}`} component={Login} /> */}
          <Route exact path={`${process.env.PUBLIC_URL + "/register"}`} component={Register} />
          <Route exact path={`${process.env.PUBLIC_URL + "/unsubscribe/:email"}`} component={Unsubscribe} />
          <Route exact path={`${process.env.PUBLIC_URL + "/"}`} component={Login} />
          <Route exact path={`${process.env.PUBLIC_URL + "/email-verification/check/:email"}`} component={EmailVerification} />

        </Switch>
      </Router>

    );
  }
}

export default Routes;