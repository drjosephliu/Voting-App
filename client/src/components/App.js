import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import SignUp from './auth/SignUp';

const Landing = () => <h2>Landing</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const PollNew = () => <h2>PollNew</h2>;

class App extends Component {
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
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
