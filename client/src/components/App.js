import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import SignUp from './auth/SignUp';
import ResetPassword from './auth/ResetPassword';

const Landing = () => <h2>Landing</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const PollNew = () => <h2>PollNew</h2>;

class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showLoginModal: false
//     };
//     this.handleCick = this.handleClick.bind(this);
//   }

  componentDidMount() {
    this.props.fetchUser();
  }

  // componentWillMount() {
  //   document.addEventListener('click', this.handleClick, false);
  // }
  //
  // componentWillUnmount() {
  //   document.removeEventListener('click', this.handleClick, false);
  // }
  //
  // toggleLoginModal() {
  //   this.setState({ showLoginModal: !this.state.showLoginModal });
  // }
  //
  // handleClick = e => {
  //  if(!ReactDOM.findDOMNode(this).contains(e.target)) {
  //    this.setState({ showLoginModal: false });
  //    this.props.dispatch(actions.hideForgotPasswordModal());
  //  }
  // }


  render() {

    return (
      <div>
        <BrowserRouter>
          <div className='container'>
            <Header />
            <Route exact path='/' component={Landing} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route path='/polls/new' component={PollNew} />
            <Route path='/signup' component={SignUp} />
            <Route path='/reset/:email/:token' component={ResetPassword} />
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
