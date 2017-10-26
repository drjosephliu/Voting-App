import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import FormField from './FormField';
import loginFields from './loginFields';
import * as actions from '../../actions';

class Login extends Component {

  renderFields() {
    return _.map(loginFields, ({ label, name, type }) => {
      return <Field key={name} label={label} name={name} type={type} component={FormField} />
    });
  }

  onSubmit(values) {
    this.props.loginUser(values, this.props.history);
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <div className='red-text'>
          {this.props.msg.login}
        </div>
        <div className='center-align'>
          <a href='/auth/google'
            className='btn waves-effect waves-light social google'>
            <i className='fa fa-google' aria-hidden='true'></i>
             Login with Google
          </a>
          <a href='/auth/facebook'
            className='btn waves-effect waves-light social facebook'>
            <i className='fa fa-facebook' aria-hidden='true'></i>
             Login with Facebook
          </a>
        </div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          {this.renderFields()}
          <button type='submit' className='teal btn waves-effect waves-light white-text'>Login</button>
          <a href='#' onClick={() => this.props.showForgotPasswordModal()}>Forgot Password</a>
        </form>
      </div>

    )
  }
};

function validate(values) {
  const errors = {};

  _.each(loginFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

Login = reduxForm({
  validate,
  form: 'loginForm'
})(Login);

function mapStateToProps({ msg, modal }) {
  return { msg, modal };
}

export default connect(mapStateToProps, actions)(withRouter(Login));
