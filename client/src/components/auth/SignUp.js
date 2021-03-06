import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import validateEmail from '../../utils/validateEmail';
import FormField from './FormField';
import signUpFields from './signUpFields';
import * as actions from '../../actions';

class SignUp extends Component {
  onSubmit(values) {
    if (values.email) { values.email = values.email.trim(); }
    this.props.createUser(values, this.props.history);
  }

  renderFields() {
    return _.map(signUpFields, ({ label, name, type }) => {
      return <Field key={name} type={type} component={FormField} name={name} label={label} />
    });
  }

  render() {
    return (
      <div className='container'>
        <h2>Sign Up</h2>
        <div className='red-text'>
          {this.props.msg.signup}
        </div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          {this.renderFields()}
          <button type='submit' className='teal btn-flat right white-text'>
            Sign Up
          </button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};
  console.log('values:',values);

  errors.email = validateEmail(values.email);

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  _.each(signUpFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

SignUp = reduxForm({
  validate,
  form: 'signupForm'
})(SignUp);

function mapStateToProps({ auth, msg }) {
  return { auth, msg };
}

export default connect(mapStateToProps, actions)(withRouter(SignUp));
