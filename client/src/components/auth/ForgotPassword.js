import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import FormField from './FormField';
import * as actions from '../../actions';
import validateEmail from '../../utils/validateEmail';

class ForgotPassword extends Component {
  onSubmit(values) {
    this.props.forgotPassword(values);
  }

  render() {
    return (
      <div className='container'>
        <h2>Forgot Password</h2>
        <div className='red-text'>
          {this.props.msg.forgotPassword}
        </div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          <Field type='text' label='Email' name='email' component={FormField} />
          <button type='submit' className='teal btn waves-effect waves-light white-text'>Submit</button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.email = validateEmail(values.email);

  if (!values.email) {
    errors.email = 'You must provide a value';
  }

  return errors;
}

ForgotPassword = reduxForm({
  validate,
  form: 'forgetPasswordForm'
})(ForgotPassword);

function mapStateToProps({ msg }) {
  return { msg };
}

export default connect(mapStateToProps, actions)(ForgotPassword);
