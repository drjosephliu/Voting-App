import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import SignUp from './auth/SignUp';
import ResetPassword from './auth/ResetPassword';
import VerifyAccount from './auth/VerifyAccount';
import NewPoll from './polls/NewPoll';
import MyPolls from './polls/MyPolls';
import AllPolls from './polls/AllPolls';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/' component={AllPolls} />
            <Route path='/mypolls/new' component={NewPoll} />
            <Route exact path='/mypolls' component={MyPolls} />
            <Route path='/signup' component={SignUp} />
            <Route path='/reset/:email/:token' component={ResetPassword} />
            <Route path='/verify/:email/:token' component={VerifyAccount} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}


export default connect(mapStateToProps, actions)(App);
