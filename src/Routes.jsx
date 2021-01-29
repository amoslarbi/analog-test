import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from './components/client/Register';

class Routes extends React.Component {
  render(){
    return (
      <Router>
        <Switch>
          
          {/* Greeter Routes */}
          {/* <Route exact path={`${process.env.PUBLIC_URL + "/"}`} component={Login} /> */}
          {/* <Route exact path={`${process.env.PUBLIC_URL + "/login"}`} component={Login} /> */}
          <Route exact path={`${process.env.PUBLIC_URL + "/register"}`} component={Register} />
          
        </Switch>
      </Router>

    );
  }
}

export default Routes;